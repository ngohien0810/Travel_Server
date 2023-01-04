const express = require('express');
// const auth = require("../middlewares/auth");
// const validate = require("../middlewares/validate");
// const userValidation = require("./User.Validation");
const NewController = require('./New.Controller');
const router = express.Router();

router.route('/news').get(NewController.getNews);
router.route('/news/:id').delete(NewController.deleteNews);

module.exports = router;
