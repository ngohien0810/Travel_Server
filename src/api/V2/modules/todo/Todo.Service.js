const httpStatus = require("http-status");
const db = require("../../models/index");

// find all todos and pagination
const getTodos = async (condition, limit, offset) => {
  const listLabels = await db.TodoLabels.findAll({
    raw: true,
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  return db.Todos.findAndCountAll({
    where: condition,
    limit,
    offset,
    include: {
      model: db.User,
      as: "users",
      attributes: {
        exclude: ["createdAt", "updatedAt", "todo_user"],
      },
      through: { attributes: [] },
    },
  }).then((result) => {
    result.rows.forEach(async (todo) => {
      todo.labels = JSON.parse(todo.labels).map((label_id) => {
        const data = listLabels.find((l) => l.id === Number(label_id));

        return data;
      });
    });

    return result;
  });
};

// create todo
const createTodo = async (todoBody) => {
  return db.Todos.create(todoBody);
};

// update todo
const updateTodo = async (todoId, todoBody) => {
  return db.Todos.update(todoBody, { where: { id: todoId } });
};

// delete todo
const deleteTodo = async (todoId) => {
  return db.Todos.destroy({ where: { id: todoId } });
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
