const { catchAsync } = require('../../helpers');
const {
    getToursService,
    createCategoryService,
    updateCategoryService,
    deleteCategoryService,
    getDestinationService,
    deleteDestinationService,
    createTourService,
    updateTourService,
    deleteTourService,
} = require('./Tour.Service');

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

// get all categories
const getTours = catchAsync(async (req, res) => {
    const { page, size, search, filter, label } = req.query;
    const { limit, offset } = getPagination(page - 1, size);

    const todos = await getToursService(search, limit, offset, req.query, label);

    res.send(getPagingData(todos, page, limit, 'data'));
});

const getDestination = catchAsync(async (req, res) => {
    const { search, tour_id } = req.query;

    const destinations = await getDestinationService(search, tour_id);

    res.send({ data: destinations });
});

const deleteDestination = catchAsync(async (req, res) => {
    const { id } = req.params;

    const destinations = await deleteDestinationService(id);

    res.send({ data: destinations });
});

//  creat new category
const createTour = catchAsync(async (req, res) => {
    const tourRes = await createTourService(req.body);
    res.status(201).send({
        data: tourRes,
    });
});

// update category
const updateTour = catchAsync(async (req, res) => {
    const tour = await updateTourService(req.params.id, req.body);
    res.send(tour);
});

// delete category
const deleteTour = catchAsync(async (req, res) => {
    await deleteTourService(req.params.id);
    res.status(204).send();
});

module.exports = {
    getTours,
    createTour,
    updateTour,
    deleteTour,
    getDestination,
    deleteDestination,
};
