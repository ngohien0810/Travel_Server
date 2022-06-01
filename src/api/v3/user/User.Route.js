const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
  res.send("User route");
});

module.exports = route;
