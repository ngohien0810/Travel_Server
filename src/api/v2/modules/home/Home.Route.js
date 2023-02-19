const express = require('express');
const HomeController = require('./Home.Controller');
const router = express.Router();

router.route('/report').get(HomeController.getReport);
router.route('/reportTourByFeed').get(HomeController.reportTourByFeedbacks);

module.exports = router;
