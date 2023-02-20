const { catchAsync } = require('../../helpers');
const { getFavouritesService, createfavouritesService, deleteFavouriteService } = require('./Favourite.Service');

const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit, field) => {
    const { count: totalItems, rows } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, [field]: rows, totalPages, currentPage };
};

// get all favourites
const getFavourites = catchAsync(async (req, res) => {
    console.log('req.query', req.query);
    const { page, size, title, params, user_id } = req.query;
    const { limit, offset } = getPagination(page - 1, size);

    const favourites = await getFavouritesService(title, limit, offset, params, user_id);

    res.send(getPagingData(favourites, page, limit, 'data'));
});

//  creat new favourites
const createFavourites = catchAsync(async (req, res) => {
    const favourite = await createfavouritesService(req.body);

    res.status(201).send(favourite);
});

// // update category
// const updateCategory = catchAsync(async (req, res) => {
//     const category = await updateCategoryService(req.params.id, req.body);
//     res.send(category);
// });

// delete favourite
const deleteFavourite = catchAsync(async (req, res) => {
    await deleteFavouriteService(req.params.id);
    res.status(204).send();
});

module.exports = {
    getFavourites,
    createFavourites,
    deleteFavourite,
    // deleteCategory,
};
