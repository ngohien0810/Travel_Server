const express = require('express');
// const auth = require("../middlewares/auth");
// const validate = require("../middlewares/validate");
// const userValidation = require("./User.Validation");
const TourController = require('./Tour.Controller');
const router = express.Router();

router.route('/tours').get(TourController.getTours).post(TourController.createTour);
router.route('/tours/:id').put(TourController.updateTour).delete(TourController.deleteTour);
router.route('/tours/destination').get(TourController.getDestination).post(TourController.createDestination);
router.route('/tours/destination/:id').put(TourController.updateDestination).delete(TourController.deleteDestination);

module.exports = router;
