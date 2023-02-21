const { catchAsync } = require('../../helpers');
const {
    getToursService,
    getDetailTourService,
    updateCategoryService,
    deleteCategoryService,
    getDestinationService,
    deleteDestinationService,
    createTourService,
    updateTourService,
    deleteTourService,
    createDestinationService,
    updateDestinationService,
    updateViewToursService,
    createFeedbackService,
    updateStatusTourService,
    getFeedbacksService,
    deleteFeedbackService,
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

const updateViewTours = catchAsync(async (req, res) => {
    const { id } = req.params;
    const tour = await updateViewToursService(id);
    res.send(tour);
});

// get all categories
const getTours = catchAsync(async (req, res) => {
    const { page, size, search, filter, label } = req.query;
    const { limit, offset } = getPagination(page - 1, size);

    const todos = await getToursService(search, limit, offset, req.query, label);

    res.send(getPagingData(todos, page, limit, 'data'));
});

const detailTour = catchAsync(async (req, res) => {
    const { id } = req.params;
    const tour = await getDetailTourService(id);
    res.send(tour);
});

const getDestination = catchAsync(async (req, res) => {
    const { search, tour_id } = req.query;

    const destinations = await getDestinationService(search, tour_id);

    res.send({ data: destinations });
});

const createDestination = catchAsync(async (req, res) => {
    const destination = await createDestinationService(req.body);
    res.send({
        status: 1,
        data: destination,
    });
});

const updateDestination = catchAsync(async (req, res) => {
    const destination = await updateDestinationService(req.body, req.params.id);
    res.send({
        status: 1,
        data: destination,
    });
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

// update status tour
const updateStatusTour = catchAsync(async (req, res) => {
    const tour = await updateStatusTourService(req.params.id, req.body);
    res.send(tour);
});

// delete category
const deleteTour = catchAsync(async (req, res) => {
    await deleteTourService(req.params.id);
    res.send({
        status: 1,
    });
});

// get feedbacks
const getFeedbacks = catchAsync(async (req, res) => {
    const { page, size, search, filter, label } = req.query;
    const { limit, offset } = getPagination(page - 1, size);

    const feedbacks = await getFeedbacksService(search, limit, offset, req.query, label);

    res.send(getPagingData(feedbacks, page, limit, 'data'));
});

// createFeedback
const createFeedback = catchAsync(async (req, res) => {
    const feedback = await createFeedbackService(req.body);
    res.send({
        status: 1,
        data: feedback,
    });
});

// createFeedback
const deleteFeedback = catchAsync(async (req, res) => {
    await deleteFeedbackService(req.params.id);
    res.send({
        status: 1,
    });
});

module.exports = {
    getTours,
    createTour,
    updateTour,
    deleteTour,
    getDestination,
    createDestination,
    updateDestination,
    deleteDestination,
    detailTour,
    updateViewTours,
    createFeedback,
    updateStatusTour,
    getFeedbacks,
    deleteFeedback,
};
