const express = require('express');
// const auth = require("../middlewares/auth");
// const validate = require("../middlewares/validate");
// const userValidation = require("./User.Validation");
const TodoController = require('./Todo.Controller');
const router = express.Router();

router.route('/todos').post(TodoController.createTodo).get(TodoController.getTodos);

router.route('/todos/:todoId').put(TodoController.updateTodos).delete(TodoController.deleteTodos);

router.route('/labels').get(TodoController.getLabels).post(TodoController.createLabel);

router.route('/labels/:labelId').put(TodoController.updateLabel).delete(TodoController.deleteLabel);

module.exports = router;
