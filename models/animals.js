const mongoose = require("./connection");

const { Schema, model } = mongoose;

// Schema
const animalsSchema = new Schema({
  species: String,
  extinct: Boolean,
  location: String,
  lifeExpectancy: Number,
});

// Model
const Animal = model("Animal", animalsSchema);

module.exports = Animal;
