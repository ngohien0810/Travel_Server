const moment = require('moment');
const db = require('../../models/index');
const bcryptjs = require('bcryptjs');

const createUserService = async (body) => {
    const { Username, Email, Phone, Password } = body;
    const salt = await bcryptjs.genSalt(10); //whatever number you want
    const hashPass = await bcryptjs.hash(Password, salt);

    const users = await db.Customers.create({
        Name: Username,
        Email,
        Phone,
        Role: 1,
        Password: hashPass,
        Gender: 1,
        DOB: null,
        Address: null,
        Status: 1,
        IsActive: 1,
        CreatedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    return users;
};

module.exports = {
    createUserService,
};
