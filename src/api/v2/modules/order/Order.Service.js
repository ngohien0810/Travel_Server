const moment = require('moment');
const sequelize = require('sequelize');
const httpStatus = require('http-status');
const { ApiError } = require('../../helpers');
const db = require('../../models/index');

// find all todos and pagination
const getOrdersService = async (title, limit, offset, filter) => {
    var condition = {
        [sequelize.Op.or]: [
            { CodeTour: { [sequelize.Op.like]: `%${title}%` } },
            { Code: { [sequelize.Op.like]: `%${title}%` } },

            // { Phone: { [sequelize.Op.like]: `%${title}%` } },
        ],
    };

    const filterWhere = {
        // filter by Status
        StatusOrder: { [sequelize.Op.eq]: filter?.status },
        // filter ranger date createDate

        CreatedDate: {
            // [sequelize.Op.between]: [
            //     sequelize.literal(`DATE('${filter?.date?.fromDate}')`),
            //     sequelize.literal(`DATE('${filter?.date?.toDate}')`),
            // ],
            [sequelize.Op.and]: [
                sequelize.fn('DATE', sequelize.col('orders.CreatedDate')), // Convert string to DATE
                { [sequelize.Op.gte]: filter?.fromDate },
                { [sequelize.Op.lte]: filter?.toDate },
            ],
        },
    };

    if (!filter?.status) {
        delete filterWhere.StatusOrder;
    }

    if (!filter?.fromDate || !filter?.toDate) {
        delete filterWhere.CreatedDate;
    }

    return db.Orders.findAndCountAll({
        where: { ...condition, ...filterWhere },
        limit,
        offset,
        distinct: true,
        // includes Customers
        include: [
            {
                model: db.Customers,
                as: 'customer',
            },
        ],
    })
        .then((result) => {
            return result;
        })
        .catch((error) => {
            throw new ApiError(httpStatus.BAD_REQUEST, error);
        });
};

// new orders
const createOrderService = async (body) => {
    console.log('🚀 ~ file: Order.Service.js:43 ~ createOrderService ~ body', body);
    const order = await db.Orders.create({
        ...body,
        CreatedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    return order;
};

const changeStatusService = async (id, StatusOrder) => {
    const order = await db.Orders.update(
        {
            StatusOrder,
        },
        {
            where: { ID: id },
        }
    );
    return order;
};

// update category
const updateCategoryService = async (id, body) => {
    const category = await db.Categories.update(
        {
            ...body,
        },
        {
            where: { Id: id },
        }
    );
    return category;
};

// delete category
const deleteCategoryService = async (id) => {
    const category = await db.Categories.destroy({
        where: { Id: id },
    });
    return category;
};

module.exports = {
    getOrdersService,
    createOrderService,
    changeStatusService,
};
