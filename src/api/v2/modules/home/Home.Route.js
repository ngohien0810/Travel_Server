const express = require('express');
const HomeController = require('./Home.Controller');
const router = express.Router();

router.route('/report').get(HomeController.getReport);

module.exports = router;
