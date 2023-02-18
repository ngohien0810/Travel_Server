const moment = require('moment');
const sequelize = require('sequelize');
const httpStatus = require('http-status');
const { ApiError } = require('../../helpers');
const db = require('../../models/index');
function decodeHTMLEntities(rawStr) {
    return rawStr.replace(/&#(\d+);/g, (match, dec) => `${String.fromCharCode(dec)}`);
}
// find all todos and pagination
const getNewService = async (title, limit, offset, filter) => {
    var condition = title ? { Title: { [sequelize.Op.like]: `%${title}%` } } : null;

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
        // offset,
        // sort CreatedDate
        order: [['CreatedDate', 'DESC']],
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

const detailNewService = async (id) => {
    return db.News.findOne({
        where: { ID: id },
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

// new new
const createNewService = async (body) => {
    const des = decodeHTMLEntities(body.Description).replace(/&lt;/g, '<');

    const newData = await db.News.create({
        Status: 1,
        IsActive: 1,
        TypePost: 1,
        UserID: 1,
        CreatedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        ...body,
        Description: des,
    });
    return newData;
};

// update category
const updateNewService = async (id, body) => {
    const des = body?.Description && decodeHTMLEntities(body?.Description)?.replace(/&lt;/g, '<');

    const dataSave = {
        Description: des,
    };

    if (!body.Description) {
        delete dataSave.Description;
    }

    const category = await db.News.update(
        {
            ...body,
            ...dataSave,
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
    createNewService,
    detailNewService,
    updateNewService,
    deleteNewsService,
    detailNewService,
};
