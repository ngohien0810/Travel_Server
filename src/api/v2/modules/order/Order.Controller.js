const { catchAsync } = require('../../helpers');
const {
    getOrdersService,
    createOrderService,
    changeStatusService,
    deleteOrderService,
    createContactService,
    changeTourStatusService,
} = require('./Order.Service');

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

    const orders = await getOrdersService(search, limit, offset, req.query);

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

const changeTourStatus = catchAsync(async (req, res) => {
    const order = await changeTourStatusService(req.params.id, req.body?.tourStatus);
    res.send(order);
});

// update category
const updateCategory = catchAsync(async (req, res) => {
    const category = await updateCategoryService(req.params.id, req.body);
    res.send(category);
});

// delete category
const deleteOrder = catchAsync(async (req, res) => {
    await deleteOrderService(req.params.id);
    res.status(204).send();
});

// contact
const createContact = catchAsync(async (req, res) => {
    const contact = await createContactService(req.body);
    res.status(201).send({
        status: 1,
        data: contact,
    });
});

module.exports = {
    getOrders,
    createOrder,
    changeStatus,
    deleteOrder,
    createContact,
    changeTourStatus,
};
