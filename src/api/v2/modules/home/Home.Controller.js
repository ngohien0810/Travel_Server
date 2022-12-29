const httpStatus = require('http-status');
const { catchAsync } = require('../../helpers');
const db = require('../../models/index');

const getReport = catchAsync(async (req, res) => {
    const countNews = await db.News.count();
    const countTour = await db.Tours.count();
    const countUser = await db.Customers.count();
    res.send({ countNews, countTour, countUser });
});

module.exports = {
    getReport,
};
