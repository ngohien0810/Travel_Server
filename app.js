const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const httpStatus = require('http-status');
const passport = require('passport');
const compression = require('compression');

// const userRoute = require("./src/api/v3/user/User.Route");
const { ApiError } = require('./src/api/v1/helpers');
const config = require('./src/config');
const { errorHandler, errorConverter } = require('./src/api/v1/middlewares/error');
const morgan = require('./src/config/Morgan.config');
const { jwtStrategy } = require('./src/config/Passport.config');
// const { authLimiter } = require("./src/api/v3/middlewares/authLimiter");

const routes = require('./src/api/routes');

const app = express();
// setup socket
const serverSocket = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(serverSocket);
const SocketService = require('./src/config/Socket.config.js');

// user variable global
global._io = io;
// set security HTTP headers
app.use(helmet());

if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// app.use(express.text({ type: 'text/html' }));
// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(
    cors({
        origin: `*`,
        credentials: true,
    })
);
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
// if (config.env === 'production') {
//   app.use('/v1/auth', authLimiter);
// }

// v1 api routes
app.use('/api', routes);

// socket
let users = [];
global._io.on('connection', (socket) => {
    console.log('Socket is connect');
    SocketService.connection(socket, users);
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Trang không tồn tại'));
});
// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = { serverSocket };
