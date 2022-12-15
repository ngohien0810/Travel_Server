const httpStatus = require('http-status');
const { ApiError } = require('../../helpers');
const db = require('../../models');

const loginUserWithPhoneAndPassword = async (phone, password) => {
    // const user = await userService.getUserByEmail(email);
    // get user by email
    const user = await db.Users.findOne({
        where: {
            Phone: phone,
        },
    });
    if (!user || !(await user.validPassword(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Số điện thoại hoặc mật khẩu không chính xác.');
    }
    return user;
};

const getUserById = async (id) => {
    return db.Users.findByPk(id);
};

module.exports = {
    loginUserWithPhoneAndPassword,
    getUserById,
};
