const httpStatus = require('http-status');
const { catchAsync } = require('../../helpers');
const { loginUserWithPhoneAndPassword, getUserById, loginUserWithPhoneAndPasswordCustomer } = require('./Auth.Service');
const { createUserService, updateUserService, changePassword } = require('./User.Service');

// register
const register = catchAsync(async (req, res) => {
    const user = await createUserService(req.body);
    res.status(httpStatus.CREATED).send({ user, message: 'Đăng ký thành công' });
});

// change appp profile
const changeAppProfile = catchAsync(async (req, res) => {
    const user = await updateUserService(req.body, req.body?.id);
    res.status(httpStatus.CREATED).send({ user, message: 'Cập nhật thành công' });
});

// change app password
const changeAppPassword = catchAsync(async (req, res) => {
    const user = await changePassword(req.body, req.body?.id);

    console.log('user', user);
    if (!user) {
        throw new Error('Mật khẩu cũ không đúng');
    }

    res.status(httpStatus.CREATED).send({ user, message: 'Cập nhật thành công' });
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

const loginApp = catchAsync(async (req, res) => {
    const { Phone, Password } = req.body;
    const user = await loginUserWithPhoneAndPasswordCustomer(Phone, Password);
    res.send({ user });
});

module.exports = {
    register,
    login,
    getMe,
    loginApp,
    changeAppProfile,
    changeAppPassword,
};
