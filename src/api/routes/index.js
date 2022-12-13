const express = require("express");
const config = require("../../config");

const authRoute = require("../v1/auth/Auth.Route");
const userRoute = require("../v1/user/User.Route");

// v2
const categoryRoute = require("../v2/modules/category/Category.Route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/v1/auth",
    route: authRoute,
  },
  {
    path: "/v1/users",
    route: userRoute,
  },
  {
    path: "/v2",
    route: categoryRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: "/docs",
    // route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
// if (config.env === "development") {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

module.exports = router;
