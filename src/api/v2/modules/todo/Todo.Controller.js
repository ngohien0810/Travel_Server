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
    const { page, size, title, filter, label } = req.query;
    const { limit, offset } = getPagination(page - 1, size);

    const todos = await TodoSevice.getTodos(title, limit, offset, filter, label);

    res.send(getPagingData(todos, page, limit, 'list_todo'));
});

// creat todo
const createTodo = catchAsync(async (req, res) => {
    await TodoSevice.createTodos(req.body);
    res.status(httpStatus.CREATED).send({ message: 'Tạo công việc thành công' });
});

// update todo
const updateTodos = catchAsync(async (req, res) => {
    await TodoSevice.updateTodos(req.params.todoId, req.body);
    res.status(httpStatus.OK).send({ message: 'Cập nhật công việc' });
});

// delete todo
const deleteTodos = catchAsync(async (req, res) => {
    await TodoSevice.deleteTodos(req.params.todoId);
    res.status(httpStatus.OK).send({ message: 'Xóa công việc thành công' });
});

// get labels
const getLabels = catchAsync(async (req, res) => {
    const labels = await db.TodoLabels.findAll({
        raw: true,
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
    });
    res.send(labels);
});

// create label
const createLabel = catchAsync(async (req, res) => {
    if (!req.body.title) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Vui lòng nhập tên nhãn');
    }
    await db.TodoLabels.create(req.body);
    res.status(httpStatus.CREATED).send({ message: 'Tạo nhãn công việc thành công' });
});

// update label
const updateLabel = catchAsync(async (req, res) => {
    if (!req.body.title) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Vui lòng nhập tên nhãn');
    }

    await db.TodoLabels.update(req.body, {
        where: {
            id: req.params.labelId,
        },
    });
    res.status(httpStatus.OK).send({ message: 'Cập nhật nhãn công việc' });
});

// delete label
const deleteLabel = catchAsync(async (req, res) => {
    await db.TodoLabels.destroy({
        where: {
            id: req.params.labelId,
        },
    });
    res.status(httpStatus.OK).send({ message: 'Xóa nhãn công việc thành công' });
});

module.exports = {
    createTodo,
    getTodos,
    updateTodos,
    deleteTodos,
    getLabels,
    createLabel,
    updateLabel,
    deleteLabel,
};
