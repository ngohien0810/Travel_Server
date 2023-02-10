const moment = require('moment');
const sequelize = require('sequelize');
const httpStatus = require('http-status');
const { ApiError } = require('../../helpers');
const db = require('../../models/index');

// find all todos and pagination
const getFavouritesService = async (title, limit, offset, filter, label) => {
    const filterWhere = {};

    return db.Favourites.findAndCountAll({
        where: { ...filterWhere },
        limit,
        offset,
        distinct: true,
        // include user and tour
        include: [
            {
                model: db.Tours,
                as: 'tour',
            },
            {
                model: db.Customers,
                as: 'user',
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
const deleteCategoryService = async (id) => {
    const category = await db.Categories.destroy({
        where: { Id: id },
    });
    return category;
};

module.exports = {
    getFavouritesService,
    // createCategoryService,
    // updateCategoryService,
    // deleteCategoryService,
};
