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
        // tourStatus
        tourStatus: { [sequelize.Op.eq]: filter?.tourStatus },
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

        // filter by CustomerID
        CustomerID: { [sequelize.Op.eq]: filter?.customerID },
    };

    if (!filter?.status) {
        delete filterWhere.StatusOrder;
    }

    if (!filter?.tourStatus) {
        delete filterWhere.tourStatus;
    }

    if (!filter?.fromDate || !filter?.toDate) {
        delete filterWhere.CreatedDate;
    }

    if (!filter?.customerID) {
        delete filterWhere.CustomerID;
    }

    return db.Orders.findAndCountAll({
        where: { ...condition, ...filterWhere },
        limit,
        offset,
        distinct: true,
        // order by CreatedDate
        order: [['CreatedDate', 'DESC']],
        // includes Customers
        include: [
            {
                model: db.Customers,
                as: 'customer',
            },
            {
                model: db.Tours,
                as: 'tour',
            },
            {
                model: db.OrderContacts,
                as: 'contact',
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

// changeTourStatusService
const changeTourStatusService = async (id, tourStatus) => {
    const order = await db.Orders.update(
        {
            tourStatus: 1,
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
const deleteOrderService = async (id) => {
    const order = await db.Orders.destroy({
        where: { Id: id },
    });
    return order;
};

// contact
const createContactService = async (body) => {
    const contact = await db.OrderContacts.create({
        ...body,
    });
    return contact;
};

module.exports = {
    getOrdersService,
    createOrderService,
    changeStatusService,
    deleteOrderService,
    createContactService,
    changeTourStatusService,
};
