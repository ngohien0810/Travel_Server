const { catchAsync } = require('../../helpers');
const { getOrdersService, createOrderService, changeStatusService } = require('./Order.Service');

const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit, field) => {
    const { count: totalItems, rows } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, [field]: rows, totalPages, currentPage };
};

// get all categories
const getOrders = catchAsync(async (req, res) => {
    const { page, size, search } = req.query;
    const { limit, offset } = getPagination(page - 1, size);

    const orders = await getOrdersService(search, limit, offset);

    res.send(getPagingData(orders, page, limit, 'data'));
});

//  creat new category
const createOrder = catchAsync(async (req, res) => {
    const order = await createOrderService(req.body);
    res.status(201).send(order);
});

const changeStatus = catchAsync(async (req, res) => {
    const order = await changeStatusService(req.params.id, req.body?.StatusOrder);
    res.send(order);
});

// update category
const updateCategory = catchAsync(async (req, res) => {
    const category = await updateCategoryService(req.params.id, req.body);
    res.send(category);
});

// delete category
const deleteCategory = catchAsync(async (req, res) => {
    await deleteCategoryService(req.params.id);
    res.status(204).send();
});

module.exports = {
    getOrders,
    createOrder,
    changeStatus,
};
