const httpStatus = require('http-status');
const { catchAsync } = require('../../helpers');
const db = require('../../models/index');

const getReport = catchAsync(async (req, res) => {
    const countNews = await db.News.count();
    const countTour = await db.Tours.count();
    const countUser = await db.Customers.count();
    res.send({ countNews, countTour, countUser });
});

const reportTourByFeedbacks = catchAsync(async (req, res) => {
    const reportTourByFeedbacks = await db.Tours.findAll({
        include: [
            {
                model: db.Feedbacks,
                as: 'feedbacks',
                required: false,
            },
        ],
    });
    res.send(reportTourByFeedbacks);
});

module.exports = {
    getReport,
    reportTourByFeedbacks,
};
