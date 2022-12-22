const moment = require('moment');
const sequelize = require('sequelize');
const httpStatus = require('http-status');
const { ApiError } = require('../../helpers');
const db = require('../../models/index');

// find all todos and pagination
const getToursService = async (title, limit, offset, filter, label) => {
    var condition = title ? { Name: { [sequelize.Op.like]: `%${title}%` } } : null;

    const filterWhere = {};

    return db.Tours.findAndCountAll({
        where: { ...condition, ...filterWhere },
        limit,
        offset,
        distinct: true,
        // relication for join table feedback
        include: [
            {
                model: db.Feedbacks,
                as: 'feedbacks',
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
    const { Name, Description, Image, Label } = body;
    const category = await db.Categories.create({
        Name,
        Description,
        Image,
        Label,
        CreatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        UpdatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    return category;
};

// update category
const updateCategoryService = async (id, body) => {
    const { Name, Description, Image, Label } = body;
    const category = await db.Categories.update(
        {
            Name,
            Description,
            Image,
            Label,
            UpdatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
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
    getToursService,
    createCategoryService,
    updateCategoryService,
    deleteCategoryService,
};
