// mongo
// const mongoose = require('mongoose');
let { serverSocket } = require('./app');

const config = require('./src/config');
const logger = require('./src/config/Logger.config');
const sequelize = require('./src/api/v2/config/connect.config');

let server;
// mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
//     logger.info('Connected to MongoDB');
// });

sequelize
    .authenticate()
    .then(() => {
        logger.info('Connected to MySQL');
    })
    .catch((err) => {
        logger.error('Error connecting to MySQL', err);
    });

server = serverSocket.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
