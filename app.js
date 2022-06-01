const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const userRoute = require("./src/api/v3/user/User.Route");

const app = express();

app.use(helmet());
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", userRoute);

module.exports = app;
