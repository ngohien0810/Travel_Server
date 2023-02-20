const { catchAsync } = require('../../helpers');
const {
    getAccountService,
    createAccountService,
    deleteAccountService,
    updateAccountService,
} = require('./Account.Service');

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
const getAccounts = catchAsync(async (req, res) => {
    const { page, size, search, filter, label } = req.query;
    const { limit, offset } = getPagination(page - 1, size);

    const accounts = await getAccountService(search, limit, offset, req.query, label);

    res.send(getPagingData(accounts, page, limit, 'data'));
});

//  creat new category
const createAccount = catchAsync(async (req, res) => {
    const account = await createAccountService(req.body);
    res.status(201).send(account);
});

// update category
const updateAccount = catchAsync(async (req, res) => {
    const account = await updateAccountService(req.params.id, req.body);
    res.send(account);
});

// delete category
const deleteAccount = catchAsync(async (req, res) => {
    await deleteAccountService(req.params.id);
    res.send({
        status: 1,
    });
});

module.exports = {
    getAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
};
