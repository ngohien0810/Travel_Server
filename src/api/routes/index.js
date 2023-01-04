const express = require('express');
const config = require('../../config');

// v2
const categoryRoute = require('../v2/modules/category/Category.Route');
const tourRoute = require('../v2/modules/tour/Tour.Route');
const authRoute = require('../v2/modules/auth/Auth.Route');
const newRoute = require('../v2/modules/new/New.Route');
const homeRoute = require('../v2/modules/home/Home.Route');

const router = express.Router();

const defaultRoutes = [
    // {
    //   path: "/v1/auth",
    //   route: authRoute,
    // },
    // {
    //   path: "/v1/users",
    //   route: userRoute,
    // },
    {
        path: '/v2',
        route: categoryRoute,
    },
    {
        path: '/v2',
        route: tourRoute,
    },
    {
        path: '/v2',
        route: newRoute,
    },
    {
        path: '/v2',
        route: authRoute,
    },
    {
        path: '/v2',
        route: homeRoute,
    },
];

const devRoutes = [
    // routes available only in development mode
    {
        path: '/docs',
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
