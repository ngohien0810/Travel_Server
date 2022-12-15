const httpStatus = require('http-status');
const { catchAsync } = require('../../helpers');
const { loginUserWithPhoneAndPassword, getUserById } = require('./Auth.Service');

// register
const register = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    const { access, refresh } = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens: { access, refresh }, message: 'Đăng ký thành công' });
});

// login
const login = catchAsync(async (req, res) => {
    const { phone, password } = req.body;
    const user = await loginUserWithPhoneAndPassword(phone, password);
    // const { access, refresh } = await tokenService.generateAuthTokens(user);
    res.send({ status: 1, user, message: 'Đăng nhập thành công' });
});

const getMe = catchAsync(async (req, res) => {
    const user = await getUserById(req.headers?.auth_id);
    res.send({ user });
});

module.exports = {
    register,
    login,
    getMe,
};
