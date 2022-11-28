const { application } = require("express");
const express = require("express");
const Animal = require("../models/animals");

// Router

const router = express.Router();

// Routes

// Seed Route
router.get("/seed", async (req, res) => {
  await Animal.remove({});
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
  ]);
  res.json(animals);
});

module.exports = router;
