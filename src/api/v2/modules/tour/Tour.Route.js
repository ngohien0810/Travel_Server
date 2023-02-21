const express = require('express');
// const auth = require("../middlewares/auth");
// const validate = require("../middlewares/validate");
// const userValidation = require("./User.Validation");
const TourController = require('./Tour.Controller');
const router = express.Router();

router.route('/tours').get(TourController.getTours).post(TourController.createTour);
router.route('/update_view_tours/:id').get(TourController.updateViewTours);
router
    .route('/tours/:id')
    .put(TourController.updateTour)
    .delete(TourController.deleteTour)
    .get(TourController.detailTour)
    .patch(TourController.updateStatusTour);

router.route('/destination').get(TourController.getDestination).post(TourController.createDestination);
router.route('/destination/:id').put(TourController.updateDestination).delete(TourController.deleteDestination);

// feedback
router.route('/feedback').get(TourController.getFeedbacks).post(TourController.createFeedback);
router.route('/feedback/:id').delete(TourController.deleteFeedback);

module.exports = router;
