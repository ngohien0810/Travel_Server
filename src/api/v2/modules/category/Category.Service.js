const moment = require('moment');
const sequelize = require('sequelize');
const httpStatus = require('http-status');
const { ApiError } = require('../../helpers');
const db = require('../../models/index');

// find all todos and pagination
const getCategoriesService = async (title, limit, offset, filter, label) => {
    var condition = title ? { Name: { [sequelize.Op.like]: `%${title}%` } } : null;

    const filterWhere = {};

    return db.Categories.findAndCountAll({
        where: { ...condition, ...filterWhere },
        limit,
        offset,
        distinct: true,
        order: [['CreatedDate', 'DESC']],
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
const deleteCategoryService = async (id) => {
    await db.News.destroy({
        where: {
            CategoryID: id,
        },
    });
    const category = await db.Categories.destroy({
        where: { Id: id },
    });
    return category;
};

module.exports = {
    getCategoriesService,
    createCategoryService,
    updateCategoryService,
    deleteCategoryService,
};
