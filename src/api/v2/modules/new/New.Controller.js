const { catchAsync } = require('../../helpers');
const {
    getNewService,
    deleteNewsService,
    createNewService,
    updateNewService,
    detailNewService,
} = require('./New.Service');

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
const getNews = catchAsync(async (req, res) => {
    const { page, size, search } = req.query;
    const { limit, offset } = getPagination(page - 1, size);

    const news = await getNewService(search, limit, offset, req.query);

    res.send(getPagingData(news, page, limit, 'data'));
});

//  creat new category
const createNew = catchAsync(async (req, res) => {
    const newRes = await createNewService(req.body);
    res.status(201).send(newRes);
});

// detail new
const getNewsById = catchAsync(async (req, res) => {
    const newRes = await detailNewService(req.params.id);
    res.send({
        data: newRes,
    });
});

// update category
const updateNews = catchAsync(async (req, res) => {
    const category = await updateNewService(req.params.id, req.body);
    res.send(category);
});

// delete category
const deleteNews = catchAsync(async (req, res) => {
    const data = await deleteNewsService(req.params.id);
    res.status(204).send(data);
});

module.exports = {
    getNews,
    createNew,
    updateNews,
    deleteNews,
    getNewsById,
};
