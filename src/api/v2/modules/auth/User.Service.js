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
        Avatar: 'https://res.cloudinary.com/hunre/image/upload/v1676274313/user_ljdkgx.png',
    });
    return users;
};

const changePassword = async (body, id) => {
    const { Password, OldPassword } = body;

    // check old password
    const user = await db.Customers.findOne({
        where: { Id: id },
    });

    const checkUser = await user.validPassword(OldPassword);
    console.log('🚀 ~ file: User.Service.js:37 ~ changePassword ~ checkUser:', checkUser);
    if (!checkUser) {
        return false;
    }

    const salt = await bcryptjs.genSalt(10); //whatever number you want
    const hashPass = await bcryptjs.hash(Password, salt);

    const users = await db.Customers.update(
        {
            Password: hashPass,
        },
        {
            where: { Id: id },
        }
    );
    return users;
};

const updateUserService = async (body, id) => {
    const users = await db.Customers.update(
        {
            ...body,
        },
        {
            where: { Id: id },
        }
    );
    return users;
};

module.exports = {
    createUserService,
    updateUserService,
    changePassword,
};
