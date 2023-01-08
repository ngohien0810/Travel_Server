const express = require('express');
// const auth = require("../middlewares/auth");
// const validate = require("../middlewares/validate");
// const userValidation = require("./User.Validation");
const TourController = require('./Tour.Controller');
const router = express.Router();

router.route('/tours').get(TourController.getTours).post(TourController.createTour);
router.route('/tours/:id').put(TourController.updateTour).delete(TourController.deleteTour);
router.route('/tours/destination').get(TourController.getDestination);
router.route('/tours/destination/:id').delete(TourController.deleteDestination);

module.exports = router;
