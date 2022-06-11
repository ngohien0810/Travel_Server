const httpStatus = require('http-status');
const { ApiError } = require('../../helpers');
const db = require('../../models/index');
const moment = require('moment');
const sequelize = require('sequelize');
// find all todos and pagination
const getTodos = async (title, limit, offset, filter) => {
    var condition = title ? { title: { [sequelize.Op.like]: `%${title}%` } } : null;
    const paramFilter = filter === 'today' ? 'startDate' : typeof Number(filter) ? 'labels' : filter;
    const filterWhere = filter
        ? {
              [paramFilter]:
                  filter === 'today'
                      ? moment(new Date()).format('YYYY-MM-DD')
                      : typeof Number(filter)
                      ? { [sequelize.Op.like]: `%${filter}%` }
                      : true,
          }
        : {};

    const listLabels = await db.TodoLabels.findAll({
        raw: true,
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
    });

    return db.Todos.findAndCountAll({
        where: { ...condition, ...filterWhere },
        limit,
        offset,
        include: [
            {
                model: db.User,
                as: 'users',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'todo_users'],
                },
                through: { attributes: [] },
            },
            {
                model: db.Todo_Comments,
                as: 'comments',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'TodoId', 'todoId'],
                },
            },
        ],
        distinct: true,
    })
        .then((result) => {
            result.rows.forEach(async (todo) => {
                if (todo.labels && todo.labels.length > 0) {
                    todo.labels = JSON.parse(todo.labels).map((label_id) => {
                        const data = listLabels.find((l) => l.id === Number(label_id));

                        return data;
                    });
                }
            });

            return result;
        })
        .catch((error) => {
            throw new ApiError(httpStatus.BAD_REQUEST, error);
        });
};

// create todo
const createTodos = async (todoBody) => {
    if (!todoBody?.title) throw new ApiError(httpStatus.BAD_REQUEST, 'Tên công việc không được để trống');
    return db.Todos.create({ ...todoBody, raw: true })
        .then((todo) => {
            if (todoBody.users && todoBody.users.length > 0) {
                const users = todoBody.users.map((user_id) => ({
                    user_id,
                    todo_id: todo.id,
                }));

                db.Todo_users.bulkCreate(users);
            }
            return todo;
        })
        .catch((error) => {
            throw new ApiError(httpStatus.BAD_REQUEST, error);
        });
};

// update todo
const updateTodos = async (todoId, todoBody) => {
    // find todo by todoId
    const todo = await db.Todos.findByPk(Number(todoId));

    if (!todo) throw new ApiError(httpStatus.BAD_REQUEST, 'Công việc không tồn tại');
    if (todoBody?.users?.length > 0) {
        await db.Todo_users.destroy({ where: { todo_id: todoId } });
        const users = todoBody.users.map((user_id) => ({
            user_id,
            todo_id: todo.id,
        }));

        db.Todo_users.bulkCreate(users);
    }
    return db.Todos.update(todoBody, { where: { id: todoId } });
};

// delete todo
const deleteTodos = async (todoId) => {
    const todo = await db.Todos.findByPk(Number(todoId));
    if (!todo) throw new ApiError(httpStatus.BAD_REQUEST, 'Công việc không tồn tại');

    db.Todo_users.destroy({ where: { todo_id: todoId } });

    return db.Todos.destroy({ where: { id: todoId } });
};

module.exports = {
    getTodos,
    createTodos,
    updateTodos,
    deleteTodos,
};
