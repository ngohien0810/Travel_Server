const { catchAsync } = require('../../helpers');
const { getNewService, deleteNewsService } = require('./New.Service');

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
    const { page, size, title } = req.query;
    const { limit, offset } = getPagination(page - 1, size);

    const news = await getNewService(title, limit, offset, req.query);

    res.send(getPagingData(news, page, limit, 'data'));
});

//  creat new category
const createCategory = catchAsync(async (req, res) => {
    const category = await createCategoryService(req.body);
    res.status(201).send(category);
});

// update category
const updateCategory = catchAsync(async (req, res) => {
    const category = await updateCategoryService(req.params.id, req.body);
    res.send(category);
});

// delete category
const deleteNews = catchAsync(async (req, res) => {
    const data = await deleteNewsService(req.params.id);
    res.status(204).send(data);
});

module.exports = {
    getNews,
    // createCategory,
    // updateCategory,
    deleteNews,
};
