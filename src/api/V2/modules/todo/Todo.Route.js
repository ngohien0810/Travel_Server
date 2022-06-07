const express = require("express");
// const auth = require("../middlewares/auth");
// const validate = require("../middlewares/validate");
// const userValidation = require("./User.Validation");
const TodoController = require("./Todo.Controller");
const router = express.Router();

router
  .route("/todos")
  //   .post(
  //     auth("manageUsers"),
  //     validate(userValidation.createUser),
  //     userController.createUser
  //   )
  .get(TodoController.getTodos);

// router
//   .route("/user_info/:userId")
//   .get(
//     auth("getUsers"),
//     validate(userValidation.getUser),
//     userController.getUser
//   )
//   .patch(
//     auth("manageUsers"),
//     validate(userValidation.updateUser),
//     userController.updateUser
//   )
//   .delete(
//     auth("manageUsers"),
//     validate(userValidation.deleteUser),
//     userController.deleteUser
//   );

module.exports = router;
