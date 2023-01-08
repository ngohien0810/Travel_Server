const moment = require('moment');
const sequelize = require('sequelize');
const httpStatus = require('http-status');
const { ApiError } = require('../../helpers');
const db = require('../../models/index');

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
    })
        .then((result) => {
            return result;
        })
        .catch((error) => {
            throw new ApiError(httpStatus.BAD_REQUEST, error);
        });
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
    const category = await db.Tours.create({
        ...body,
        Status: 1,
        IsActive: 1,
        CreatedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    return category;
};

// update category
const updateTourService = async (id, body) => {
    const tours = await db.Tours.update(
        {
            ...body,
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

module.exports = {
    getToursService,
    createTourService,
    updateTourService,
    deleteTourService,
    getDestinationService,
    deleteDestinationService,
};
