const moment = require('moment');
const sequelize = require('sequelize');
const httpStatus = require('http-status');
const { ApiError } = require('../../helpers');
const db = require('../../models/index');

// find all todos and pagination
const getFavouritesService = async (title, limit, offset, filter, user_id) => {
    const filterWhere = {
        User_Id: user_id,
    };

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
                // include feedbacks to tours
                include: [
                    {
                        model: db.Feedbacks,
                        as: 'feedbacks',
                    },
                ],
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

// new favourite
const createfavouritesService = async (body) => {
    const favourite = await db.Favourites.create({
        ...body,
    });
    return favourite;
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
const deleteFavouriteService = async (id) => {
    const favourite = await db.Favourites.destroy({
        where: { Tour_Id: id },
    });
    return favourite;
};

module.exports = {
    getFavouritesService,
    createfavouritesService,
    deleteFavouriteService,
    // deleteCategoryService,
};
