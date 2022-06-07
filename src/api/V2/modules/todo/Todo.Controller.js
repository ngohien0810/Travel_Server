const httpStatus = require("http-status");
const db = require("../../models/index");
const TodoSevice = require("./Todo.Service");

const { ApiError, catchAsync } = require("../../helpers");

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit, field) => {
  const { count: totalItems, rows } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, [field]: rows, totalPages, currentPage };
};

// get all todos
const getTodos = catchAsync(async (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  const { limit, offset } = getPagination(page, size);

  const todos = await TodoSevice.getTodos(condition, limit, offset);

  res.send(getPagingData(todos, page, limit, "list_todo"));
});

const createTodo = catchAsync(async (req, res) => {
  const todo = await TodoSevice.createTodo(req.body);
  res.status(httpStatus.CREATED).send(todo);
});

module.exports = {
  createTodo,
  getTodos,
};
