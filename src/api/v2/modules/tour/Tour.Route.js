const express = require('express');
// const auth = require("../middlewares/auth");
// const validate = require("../middlewares/validate");
// const userValidation = require("./User.Validation");
const TourController = require('./Tour.Controller');
const router = express.Router();

router.route('/tours').get(TourController.getTours);

module.exports = router;
