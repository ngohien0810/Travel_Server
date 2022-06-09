const httpStatus = require('http-status');
const db = require('../../models/index');
const TodoSevice = require('./Todo.Service');

const { ApiError, catchAsync } = require('../../helpers');

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
    const { page, size, title, filter } = req.query;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    const { limit, offset } = getPagination(page - 1, size);

    const todos = await TodoSevice.getTodos(condition, limit, offset, filter);

    res.send(getPagingData(todos, page, limit, 'list_todo'));
});

// creat todo
const createTodo = catchAsync(async (req, res) => {
    await TodoSevice.createTodos(req.body);
    res.status(httpStatus.CREATED).send({ msg: 'Tạo công việc thành công' });
});

// update todo
const updateTodos = catchAsync(async (req, res) => {
    await TodoSevice.updateTodos(req.params.todoId, req.body);
    res.status(httpStatus.OK).send({ msg: 'Cập nhật công việc' });
});

// delete todo
const deleteTodos = catchAsync(async (req, res) => {
    await TodoSevice.deleteTodos(req.params.todoId);
    res.status(httpStatus.OK).send({ msg: 'Xóa công việc thành công' });
});

module.exports = {
    createTodo,
    getTodos,
    updateTodos,
    deleteTodos,
};
