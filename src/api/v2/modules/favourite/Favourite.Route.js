const express = require('express');
// const auth = require("../middlewares/auth");
// const validate = require("../middlewares/validate");
// const userValidation = require("./User.Validation");
const FavouriteController = require('./Favourite.Controller');
const router = express.Router();

router.route('/favourites').get(FavouriteController.getFavourites);
// router.route('/categories/:id').put(CategoryController.updateCategory).delete(CategoryController.deleteCategory);

module.exports = router;
