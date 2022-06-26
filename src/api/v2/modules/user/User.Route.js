const express = require("express");
const userController = require("./User.Controller");
const router = express.Router();

router.route("/get_user").get(userController.getUser);

module.exports = router;
