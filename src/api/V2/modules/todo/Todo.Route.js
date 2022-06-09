const express = require("express");
// const auth = require("../middlewares/auth");
// const validate = require("../middlewares/validate");
// const userValidation = require("./User.Validation");
const TodoController = require("./Todo.Controller");
const router = express.Router();

router
  .route("/todos")
  .post(TodoController.createTodo)
  .get(TodoController.getTodos);

router
  .route("/todos/:todoId")
  //   .get(
  //     auth("getUsers"),
  //     validate(userValidation.getUser),
  //     userController.getUser
  //   )
  .put(TodoController.updateTodos)
  .delete(TodoController.deleteTodos);

module.exports = router;
