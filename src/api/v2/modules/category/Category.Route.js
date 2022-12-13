const express = require('express');
// const auth = require("../middlewares/auth");
// const validate = require("../middlewares/validate");
// const userValidation = require("./User.Validation");
const CategoryController = require('./Category.Controller');
const router = express.Router();

router.route('/categories').get(CategoryController.getCategories);

module.exports = router;