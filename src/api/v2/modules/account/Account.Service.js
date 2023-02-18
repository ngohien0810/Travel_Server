const moment = require('moment');
const sequelize = require('sequelize');
const httpStatus = require('http-status');
const { ApiError } = require('../../helpers');
const db = require('../../models/index');
const bcryptjs = require('bcryptjs');

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
const createAccountService = async (body) => {
    const { Password } = body;
    const salt = await bcryptjs.genSalt(10); //whatever number you want
    const hashPass = await bcryptjs.hash(Password, salt);

    const account = await db.Users.create({
        ...body,
        Status: 1,
        IsActive: 1,
        Role: 0,
        Password: hashPass,
        CreatedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    return account;
};

// update category
const updateAccountService = async (id, body) => {
    const account = await db.Users.update(
        {
            ...body,
        },
        {
            where: { Id: id },
        }
    );
    return account;
};

// delete category
const deleteAccountService = async (id) => {
    const account = await db.Users.destroy({
        where: { Id: id },
    });
    return account;
};

module.exports = {
    getAccountService,
    createAccountService,
    updateAccountService,
    deleteAccountService,
};
