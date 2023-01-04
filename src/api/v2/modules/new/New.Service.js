const moment = require('moment');
const sequelize = require('sequelize');
const httpStatus = require('http-status');
const { ApiError } = require('../../helpers');
const db = require('../../models/index');

// find all todos and pagination
const getNewService = async (title, limit, offset, filter) => {
    var condition = title ? { Name: { [sequelize.Op.like]: `%${title}%` } } : null;

    const filterWhere = {
        // filter by category
        CategoryID: { [sequelize.Op.eq]: filter?.category },
        // filter by status
        Status: { [sequelize.Op.eq]: filter?.status },
        // filter ranger date createDate
        CreatedDate: {
            [sequelize.Op.between]: [filter?.date?.fromDate, filter?.date?.toDate],
        },
    };

    if (!filter?.status) {
        delete filterWhere.Status;
    }

    if (!filter?.fromDate) {
        delete filterWhere.CreatedDate;
    }

    if (!filter?.category) {
        delete filterWhere.CategoryID;
    }

    return db.News.findAndCountAll({
        where: { ...condition, ...filterWhere },
        limit,
        offset,
        distinct: true,
        include: [
            {
                model: db.Categories,
                as: 'category',
                // attributes: ['Id', 'Rating', 'Comment', 'CreatedAt'],
                required: false,
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

// new category
const createCategoryService = async (body) => {
    const category = await db.Categories.create({
        ...body,
        Status: 1,
        IsActive: 1,
        Discriminator: 1,
        CreatedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    return category;
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
const deleteNewsService = async (id) => {
    const newData = await db.News.destroy({
        where: { ID: id },
    });
    return newData;
};

module.exports = {
    getNewService,
    // createCategoryService,
    // updateCategoryService,
    deleteNewsService,
};
