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

// Destroy Route

// Update Route

// Create Route

// Edit Route

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
      species: "Eagle",
      extinct: false,
      location: "USA",
      lifeExpectancy: 25,
    },
  ]).catch((error) => errorHandler(error, res));
  res.json(animals);
});

module.exports = router;
