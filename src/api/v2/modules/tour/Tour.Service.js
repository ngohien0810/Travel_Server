const moment = require('moment');
const sequelize = require('sequelize');
const httpStatus = require('http-status');
const { ApiError } = require('../../helpers');
const db = require('../../models/index');
function decodeHTMLEntities(rawStr) {
    return rawStr.replace(/&#(\d+);/g, (match, dec) => `${String.fromCharCode(dec)}`);
}

const updateViewToursService = (id) => {
    return db.Tours.update(
        {
            Views: sequelize.literal('Views + 1'),
        },
        {
            where: {
                Id: id,
            },
        }
    )
        .then((result) => {
            return result;
        })
        .catch((error) => {
            throw new ApiError(httpStatus.BAD_REQUEST, error);
        });
};

// find all todos and pagination
const getToursService = async (title, limit, offset, filter, label) => {
    // filter by title or code
    const condition = title
        ? {
              [sequelize.Op.or]: [
                  { Title: { [sequelize.Op.like]: `%${title}%` } },
                  { Code: { [sequelize.Op.like]: `%${title}%` } },
                  { TourPrice: { [sequelize.Op.like]: `%${title}%` } },
              ],
          }
        : {};

    const filterWhere = {
        // filter by Status
        Status: { [sequelize.Op.eq]: filter?.status },
        // filter ranger date createDate

        DateStartTour: {
            // [sequelize.Op.between]: [
            //     sequelize.literal(`DATE('${filter?.date?.fromDate}')`),
            //     sequelize.literal(`DATE('${filter?.date?.toDate}')`),
            // ],
            [sequelize.Op.and]: [
                sequelize.fn('DATE', sequelize.col('DateStartTour')), // Convert string to DATE
                { [sequelize.Op.gte]: sequelize.fn('DATE', filter?.fromDate) },
                { [sequelize.Op.lte]: sequelize.fn('DATE', filter?.toDate) },
            ],
        },
    };

    if (!filter?.status) {
        delete filterWhere.Status;
    }

    if (!filter?.fromDate || !filter?.toDate) {
        delete filterWhere.DateStartTour;
    }

    return db.Tours.findAndCountAll({
        where: { ...condition, ...filterWhere },
        limit,
        offset,
        // sort CreatedDate
        order: [['CreatedDate', 'DESC']],
        distinct: true,
        // relication for join table feedback
        include: [
            {
                model: db.Feedbacks,
                as: 'feedbacks',
                // attributes: ['Id', 'Rating', 'Comment', 'CreatedAt'],
                required: false,
                // sort CreatedDate
                order: [['CreatedDate', 'DESC']],
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

const getDestinationService = async (search, tour_id) => {
    var condition = search ? { Name: { [sequelize.Op.like]: `%${search}%` } } : null;

    return db.Destinations.findAll({
        where: {
            ...condition,
            TourID: tour_id,
        },
    });
};

const getDetailTourService = async (id) => {
    return db.Tours.findOne({
        where: { Id: id },
        include: [
            {
                model: db.Feedbacks,
                as: 'feedbacks',
                // attributes: ['Id', 'Rating', 'Comment', 'CreatedAt'],
                required: false,
            },
        ],
    });
};

const createDestinationService = async (body) => {
    const des = decodeHTMLEntities(body.Description).replace(/&lt;/g, '<');

    return db.Destinations.create({
        ...body,
        Status: 1,
        IsActive: 1,
        Description: des,
        CreatedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    })
        .then((result) => {
            return result;
        })
        .catch((error) => {
            throw new ApiError(httpStatus.BAD_REQUEST, error);
        });
};

const updateDestinationService = async (body, id) => {
    const des = decodeHTMLEntities(body.Description).replace(/&lt;/g, '<');
    return await db.Destinations.update(
        {
            ...body,
            Description: des,
        },
        {
            where: { Id: id },
        }
    );
};

const deleteDestinationService = async (id) => {
    return db.Destinations.destroy({
        where: { ID: id },
    })
        .then((result) => {
            return result;
        })
        .catch((error) => {
            throw new ApiError(httpStatus.BAD_REQUEST, error);
        });
};

// new category
const createTourService = async (body) => {
    const des = decodeHTMLEntities(body.Description).replace(/&lt;/g, '<');

    const category = await db.Tours.create({
        ...body,
        Status: 1,
        IsActive: 1,
        CreatedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        Description: des,
        Views: 0,
    });
    return category;
};

// update category
const updateTourService = async (id, body) => {
    const des = decodeHTMLEntities(body.Description).replace(/&lt;/g, '<');

    const tours = await db.Tours.update(
        {
            ...body,
            Description: des,
        },
        {
            where: { Id: id },
        }
    );
    return tours;
};

// update status tour
const updateStatusTourService = async (id, body) => {
    const tours = await db.Tours.update(
        {
            Status: body?.Status,
        },
        {
            where: { Id: id },
        }
    );
    return tours;
};

// delete category
const deleteTourService = async (id) => {
    const category = await db.Tours.destroy({
        where: { ID: id },
    });
    return category;
};

// getFeedbacksService
const getFeedbacksService = async (title, limit, offset, query, label) => {
    const condition = title
        ? {
              [sequelize.Op.or]: [
                  { Name: { [sequelize.Op.like]: `%${title}%` } },
                  { Phone: { [sequelize.Op.like]: `%${title}%` } },
              ],
          }
        : {};

    return db.Feedbacks.findAndCountAll({
        where: { ...condition },
        limit,
        offset,
        // sort CreatedDate
        order: [['CreatedDate', 'DESC']],
        distinct: true,
        // relication for join table feedback
        include: [
            {
                model: db.Tours,
                as: 'tour',
                required: false,
                order: [['CreatedDate', 'DESC']],
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

// createFeedbackService
const createFeedbackService = async (body) => {
    const feedback = await db.Feedbacks.create({
        ...body,
        isActive: 1,
        CreatedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    return feedback;
};

const deleteFeedbackService = async (id) => {
    const feedback = await db.Feedbacks.destroy({
        where: { ID: id },
    });
    return feedback;
};

module.exports = {
    getToursService,
    createTourService,
    updateTourService,
    deleteTourService,
    getDestinationService,
    createDestinationService,
    updateDestinationService,
    deleteDestinationService,
    getDetailTourService,
    updateViewToursService,
    createFeedbackService,
    updateStatusTourService,
    getFeedbacksService,
    deleteFeedbackService,
};
