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
    var condition = title ? { Title: { [sequelize.Op.like]: `%${title}%` } } : null;

    const filterWhere = {
        // filter by Status
        Status: { [sequelize.Op.eq]: filter?.status },
        // filter ranger date createDate
        DateStartTour: {
            [sequelize.Op.between]: [filter?.date?.fromDate, filter?.date?.toDate],
        },
    };

    if (!filter?.status) {
        delete filterWhere.Status;
    }

    if (!filter?.fromDate) {
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
    return db.Destinations.create({
        ...body,
        Status: 1,
        IsActive: 1,
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
    return await db.Destinations.update(
        {
            ...body,
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

// delete category
const deleteTourService = async (id) => {
    const category = await db.Tours.destroy({
        where: { ID: id },
    });
    return category;
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
};
