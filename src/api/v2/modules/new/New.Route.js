const express = require('express');
// const auth = require("../middlewares/auth");
// const validate = require("../middlewares/validate");
// const userValidation = require("./User.Validation");
const NewController = require('./New.Controller');
const router = express.Router();

router.route('/news').get(NewController.getNews).post(NewController.createNew);
router.route('/news/:id').delete(NewController.deleteNews).get(NewController.getNewsById).put(NewController.updateNews);

module.exports = router;
