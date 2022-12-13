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
    })
        .then((result) => {
            return result;
        })
        .catch((error) => {
            throw new ApiError(httpStatus.BAD_REQUEST, error);
        });
};

module.exports = {
    getCategoriesService,
};