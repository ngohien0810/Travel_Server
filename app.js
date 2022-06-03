const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const httpStatus = require("http-status");
const passport = require("passport");

// const userRoute = require("./src/api/v3/user/User.Route");
const { ApiError } = require("./src/api/v3/helpers");
const config = require("./src/config");
const {
  errorHandler,
  errorConverter,
} = require("./src/api/v3/middlewares/error");
const morgan = require("./src/config/Morgan.config");
const { jwtStrategy } = require("./src/config/Passport.config");
// const { authLimiter } = require("./src/api/v3/middlewares/authLimiter");

const routes = require("./src/api/v3/routes");

const app = express();
// set security HTTP headers
app.use(helmet());

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: false }));
// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// limit repeated failed requests to auth endpoints
// if (config.env === 'production') {
//   app.use('/v1/auth', authLimiter);
// }

// v1 api routes
app.use("/api", routes);

// setup  router
// app.use("/api", userRoute);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Trang không tồn tại"));
});
// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
