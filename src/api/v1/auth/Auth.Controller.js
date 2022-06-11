// library
const httpStatus = require('http-status');

// module
const { catchAsync } = require('../helpers');
const tokenService = require('./Token.Service');
const authService = require('./Auth.Service');
const userService = require('../user/User.Service');
const emailService = require('./Email.Service');

// register
const register = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    const { access, refresh } = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens: { access, refresh }, message: 'Đăng ký thành công' });
});

// login
const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const { access, refresh } = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens: { access, refresh }, message: 'Đăng nhập thành công' });
});

// logout
const logout = catchAsync(async (req, res) => {
    await authService.logout(req.body.refreshToken);
    res.send();
});

// refresh token
const refreshTokens = catchAsync(async (req, res) => {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.send({ ...tokens });
});

// forgot password
const forgotPassword = catchAsync(async (req, res) => {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
    await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
    res.status(httpStatus.NO_CONTENT).send();
});

// reset password
const resetPassword = catchAsync(async (req, res) => {
    await authService.resetPassword(req.query.token, req.body.password);
    res.status(httpStatus.NO_CONTENT).send();
});

// send email verification
const sendVerificationEmail = catchAsync(async (req, res) => {
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
    await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
    res.send({ message: 'Kiểm tra email để lấy mã xác thực.' });
});

// verifyEmail
const verifyEmail = catchAsync(async (req, res) => {
    await authService.verifyEmail(req.query.token);
    res.send({ message: 'Xác thực tài khoản thành công, Cảm ơn quý khách!' });
});

// export
module.exports = {
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
    sendVerificationEmail,
    verifyEmail,
};
