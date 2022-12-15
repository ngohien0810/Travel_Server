const { catchAsync } = require('../../helpers');
const {
    getCategoriesService,
    createCategoryService,
    updateCategoryService,
    deleteCategoryService,
} = require('./Category.Service');

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
const getCategories = catchAsync(async (req, res) => {
    const { page, size, title, filter, label } = req.query;
    const { limit, offset } = getPagination(page - 1, size);

    const todos = await getCategoriesService(title, limit, offset, filter, label);

    res.send(getPagingData(todos, page, limit, 'data'));
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
const deleteCategory = catchAsync(async (req, res) => {
    await deleteCategoryService(req.params.id);
    res.status(204).send();
});

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};
