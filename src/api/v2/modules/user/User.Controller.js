const { catchAsync } = require('../../helpers');
const db = require('../../models/index');

const { getUsersService } = require('./User.Service');

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
const getUsers = catchAsync(async (req, res) => {
    const { page, size, search, label } = req.query;
    const { limit, offset } = getPagination(page - 1, size);

    const customers = await getUsersService(search, limit, offset, req.query, label);

    res.send(getPagingData(customers, page, limit, 'data'));
});

const detailUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await db.Customers.findOne({
        where: { ID: id },
    });
    res.send(user);
});

const changeStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { Status } = req.body;
    const user = await db.Customers.update(
        {
            Status,
        },
        {
            where: { ID: id },
        }
    );
    res.send({
        status: 1,
        data: user,
    });
});

const deleteUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await db.Customers.destroy({
        where: { ID: id },
    });
    res.send({
        status: 1,
    });
});

module.exports = {
    getUsers,
    changeStatus,
    detailUser,
    deleteUser,
};
