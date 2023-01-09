const express = require('express');
// const auth = require("../middlewares/auth");
// const validate = require("../middlewares/validate");
// const userValidation = require("./User.Validation");
const AccountController = require('./Account.Controller');
const router = express.Router();

router.route('/accounts').get(AccountController.getAccounts);
// router.route('/accounts/:id').put(AccountController.updateCategory).delete(AccountController.deleteCategory);

module.exports = router;
