const { application } = require("express");
const express = require("express");
const Animal = require("../models/animals");

// Router

const router = express.Router();

// Error Handler
function errorHandler(error, res) {
  res.json(error);
}

// Routes



// Index Route
router.get("/", async (req, res) => {
  const animals = await Animal.find({}).catch((error) =>
    errorHandler(error, res)
  );
  res.render("animals/index.ejs", { animals });
});

// New Route

router.get("/new", (req, res) => {
  res.render("animals/new.ejs");
});

// Destroy Route
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Animal.findByIdAndRemove(id, (err, animal) => {
    res.redirect("/animals");
  });
});

// Update Route

router.put("/:id", (req, res) => {
    req.body.extinct = req.body.extinct === "on" ? true : false
    // {new: true} need this to update th page
    Animal.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedAnimal) => {
        res.redirect(`/animals/${req.params.id}`)
    })
})

// Create Route
router.post("/", (req, res) => {
  req.body.extinct = req.body.extinct === "on" ? true : false;
  Animal.create(req.body, (err, createdAnimal) => {
    console.log(createdAnimal);
    res.redirect("/animals");
  });
});

// Edit Route

router.get("/:id/edit", (req, res) => {
    const id = req.params.id
    Animal.findById(id, (err, animal) => {
        res.render("animals/edit.ejs", {animal})
    })
})

// Show route
router.get("/:id", (req, res) => {
  Animal.findById(req.params.id).then((animal) => {
    res.render("animals/show.ejs", { animal });
  });
});

// Seed Route
router.get("/seed", async (req, res) => {
  await Animal.remove({}).catch((error) => errorHandler(error, res));
  const animals = await Animal.create([
    {
      species: "Dolphin",
      extinct: false,
      location: "Ocean",
      lifeExpectancy: 45,
    },
    {
      species: "T-Rex",
      extinct: true,
      location: "Jurassic Era",
      lifeExpectancy: 28,
    },
    {
      species: "Lion",
      extinct: false,
      location: "Africa",
      lifeExpectancy: 15,
    },
    {
      species: " Bald Eagle",
      extinct: false,
      location: "USA",
      lifeExpectancy: 25,
    },
  ]).catch((error) => errorHandler(error, res));
  res.json(animals);
});

module.exports = router;
