const moment = require('moment');
const sequelize = require('sequelize');
const httpStatus = require('http-status');
const { ApiError } = require('../../helpers');
const db = require('../../models/index');

// find all todos and pagination
const getAccountService = async (title, limit, offset, filter, label) => {
    let condition = {};
    // filter by username or phone by title
    if (title) {
        condition = {
            [sequelize.Op.or]: [
                { Username: { [sequelize.Op.like]: `%${title}%` } },
                { Phone: { [sequelize.Op.like]: `%${title}%` } },
            ],
        };
    }
    const filterWhere = {};

    if (filter?.status) {
        //  filter by status
        filterWhere.Status = filter.status;
    }

    return db.Users.findAndCountAll({
        where: { ...condition, ...filterWhere },
        limit,
        offset,
        distinct: true,
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
    getAccountService,
    createCategoryService,
    updateCategoryService,
    deleteCategoryService,
};
