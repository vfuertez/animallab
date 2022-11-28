require("dotenv").config();
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const morgan = require("morgan");
const PORT = process.env.PORT;

// Middleware
app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// ROutes
app.get("/", (req, res) => {
  res.send("server is working");
});

// Server listener
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
