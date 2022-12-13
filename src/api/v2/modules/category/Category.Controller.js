const { catchAsync } = require("../../helpers");
const { getCategoriesService } = require("./Category.Service");


const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit, field) => {
    const { count: totalItems, rows } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, [field]: rows, totalPages, currentPage };
};



// get all todos
const getCategories = catchAsync(async (req, res) => {
    const { page, size, title, filter, label } = req.query;
    const { limit, offset } = getPagination(page - 1, size);

    const todos = await getCategoriesService(title, limit, offset, filter, label);

    res.send(getPagingData(todos, page, limit, 'list_todo'));
});


module.exports = {
    getCategories,
};