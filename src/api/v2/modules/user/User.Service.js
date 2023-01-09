const moment = require('moment');
const sequelize = require('sequelize');
const httpStatus = require('http-status');
const { ApiError } = require('../../helpers');
const db = require('../../models/index');

// find all todos and pagination
const getUsersService = async (title, limit, offset, filter, label) => {
    let condition = {};
    // filter by username or phone by title
    if (title) {
        condition = {
            [sequelize.Op.or]: [
                { Name: { [sequelize.Op.like]: `%${title}%` } },
                { Phone: { [sequelize.Op.like]: `%${title}%` } },
            ],
        };
    }
    const filterWhere = {};

    if (filter?.status) {
        //  filter by status
        filterWhere.Status = filter.status;
    }

    return db.Customers.findAndCountAll({
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
    getUsersService,
};
