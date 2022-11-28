require("dotenv").config();
const mongoose = require("mongoose"); // import mongoose

// Establish a connection
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(DATABASE_URL, CONFIG);
// Connection Events
mongoose.connection
  .on("open", () => console.log("Connected to Mongo"))
  .on("close", () => console.log("Disconnected from Mongo"))
  .on("error", () => console.log(error));

// export the mongoose object
module.exports = mongoose;
