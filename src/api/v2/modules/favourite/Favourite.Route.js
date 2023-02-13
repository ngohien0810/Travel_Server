const express = require('express');
// const auth = require("../middlewares/auth");
// const validate = require("../middlewares/validate");
// const userValidation = require("./User.Validation");
const FavouriteController = require('./Favourite.Controller');
const router = express.Router();

router.route('/favourites').get(FavouriteController.getFavourites).post(FavouriteController.createFavourites);
router.route('/favourites/:id').delete(FavouriteController.deleteFavourite);

module.exports = router;
