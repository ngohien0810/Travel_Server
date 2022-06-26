# RESTful API Node Server Boilerplate

[![Build Status](https://travis-ci.org/hagopj13/node-express-boilerplate.svg?branch=master)](https://travis-ci.org/hagopj13/node-express-boilerplate)
[![Coverage Status](https://coveralls.io/repos/github/hagopj13/node-express-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/hagopj13/node-express-boilerplate?branch=master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

A boilerplate/starter project for quickly building RESTful APIs using Node.js, Express, and Mongoose.

By running a single command, you will get a production-ready Node.js app installed and fully configured on your machine. The app comes with many built-in features, such as authentication using JWT, request validation, unit and integration tests, continuous integration, docker support, API documentation, pagination, etc. For more details, check the features list below.

## Quick Start

To create a project, simply run:

```bash
npx create-nodejs-express-app <project-name>
```

Or

```bash
npm init nodejs-express-app <project-name>
```

## Config sequelize cli

```bash
npm i sequelize
```

and:

```bash
npm i sequelize-cli
```

create file .sequelizesrc and

```bash
var path = require("path");

module.exports = {
  config: path.resolve("./src/api/v2", "config", "database.json"),
  "migrations-path": path.resolve("./src/api/v2", "migrations"),
  "models-path": path.resolve("./src/api/v2", "models"),
  "seeders-path": path.resolve("./src/api/v2", "seeders"),
};
```

run

```bash
npx sequelize-cli init
```

## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

Clone the repo:

```bash
git clone --depth 1 https://github.com/hagopj13/node-express-boilerplate.git
cd node-express-boilerplate
npx rimraf ./.git
```

Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
cp .env.example .env
# open .env and modify the environment variables (if needed)
```

## Table of Contents

-   [RESTful API Node Server Boilerplate](#restful-api-node-server-boilerplate)
    -   [Quick Start](#quick-start)
    -   [Config sequelize cli](#config-sequelize-cli)
    -   [Manual Installation](#manual-installation)
    -   [Table of Contents](#table-of-contents)
    -   [Features](#features)
    -   [Commands](#commands)
    -   [Environment Variables](#environment-variables)
    -   [Project Structure](#project-structure)
    -   [API Documentation](#api-documentation)
        -   [API Endpoints](#api-endpoints)
    -   [Error Handling](#error-handling)
    -   [Validation](#validation)
    -   [Authentication](#authentication)
    -   [Authorization](#authorization)
    -   [Logging](#logging)
    -   [Custom Mongoose Plugins](#custom-mongoose-plugins)
        -   [toJSON](#tojson)
        -   [paginate](#paginate)
    -   [Linting](#linting)
    -   [Contributing](#contributing)
    -   [Inspirations](#inspirations)
    -   [License](#license)

## Features

-   **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
-   **Authentication and authorization**: using [passport](http://www.passportjs.org)
-   **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
-   **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
-   **Testing**: unit and integration tests using [Jest](https://jestjs.io)
-   **Error handling**: centralized error handling mechanism
-   **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
-   **Process management**: advanced production process management using [PM2](https://pm2.keymetrics.io)
-   **Dependency management**: with [Yarn](https://yarnpkg.com)
-   **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
-   **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
-   **Santizing**: sanitize request data against xss and query injection
-   **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
-   **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)
-   **CI**: continuous integration with [Travis CI](https://travis-ci.org)
-   **Docker support**
-   **Code coverage**: using [coveralls](https://coveralls.io)
-   **Code quality**: with [Codacy](https://www.codacy.com)
-   **Git hooks**: with [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
-   **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)
-   **Editor config**: consistent editor configuration using [EditorConfig](https://editorconfig.org)

## Commands

Running locally:

```bash
yarn dev
```

Running in production:

```bash
yarn start
```

Testing:

```bash
# run all tests
yarn test
# run all tests in watch mode
yarn test:watch
# run test coverage
yarn coverage
```

Docker:

```bash
# run docker container in development mode
yarn docker:dev
# run docker container in production mode
yarn docker:prod
# run all tests in a docker container
yarn docker:test
```

Linting:

```bash
# run ESLint
yarn lint
# fix ESLint errors
yarn lint:fix
# run prettier
yarn prettier
# fix prettier errors
yarn prettier:fix
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000
# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/node-boilerplate
# JWT
# JWT secret key
JWT_SECRET=thisisasamplesecret
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=30
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=30
# SMTP configuration options for the email service
# For testing, you can use a fake SMTP service like Ethereal: https://ethereal.email/create
SMTP_HOST=email-server
SMTP_PORT=587
SMTP_USERNAME=email-server-username
SMTP_PASSWORD=email-server-password
EMAIL_FROM=support@yourapp.com
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/v1/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /v1/auth/register` - register\
`POST /v1/auth/login` - login\
`POST /v1/auth/refresh-tokens` - refresh auth tokens\
`POST /v1/auth/forgot-password` - send reset password email\
`POST /v1/auth/reset-password` - reset password\
`POST /v1/auth/send-verification-email` - send verification email\
`POST /v1/auth/verify-email` - verify email

**User routes**:\
`POST /v1/users` - create a user\
`GET /v1/users` - get all users\
`GET /v1/users/:userId` - get user\
`PATCH /v1/users/:userId` - update user\
`DELETE /v1/users/:userId` - delete user

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`). For convenience, you can also wrap the controller inside the catchAsync utility wrapper, which forwards the error.

```javascript
const catchAsync = require('../utils/catchAsync');
const controller = catchAsync(async (req, res) => {
    // this error will be forwarded to the error handling middleware
    throw new Error('Something wrong happened');
});
```

The error handling middleware sends an error response, which has the following format:

```json
{
    "code": 404,
    "message": "Not found"
}
```

When running in development mode, the error response also contains the error stack.

The app has a utility ApiError class to which you can attach a response code and a message, and then throw it from anywhere (catchAsync will catch it).

For example, if you are trying to get a user from the DB who is not found, and you want to send a 404 error, the code should look something like:

```javascript
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');
const getUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
};
```

## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `src/validations` directory and are used in the routes by providing them as parameters to the `validate` middleware.

```javascript
const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const router = express.Router();
router.post('/users', validate(userValidation.createUser), userController.createUser);
```

## Authentication

To require authentication for certain routes, you can use the `auth` middleware.

```javascript
const express = require('express');
const auth = require('../../middlewares/auth');
const userController = require('../../controllers/user.controller');
const router = express.Router();
router.post('/users', auth(), userController.createUser);
```

These routes require a valid JWT access token in the Authorization request header using the Bearer schema. If the request does not contain a valid access token, an Unauthorized (401) error is thrown.

**Generating Access Tokens**:

An access token can be generated by making a successful call to the register (`POST /v1/auth/register`) or login (`POST /v1/auth/login`) endpoints. The response of these endpoints also contains refresh tokens (explained below).

An access token is valid for 30 minutes. You can modify this expiration time by changing the `JWT_ACCESS_EXPIRATION_MINUTES` environment variable in the .env file.

**Refreshing Access Tokens**:

After the access token expires, a new access token can be generated, by making a call to the refresh token endpoint (`POST /v1/auth/refresh-tokens`) and sending along a valid refresh token in the request body. This call returns a new access token and a new refresh token.

A refresh token is valid for 30 days. You can modify this expiration time by changing the `JWT_REFRESH_EXPIRATION_DAYS` environment variable in the .env file.

## Authorization

The `auth` middleware can also be used to require certain rights/permissions to access a route.

```javascript
const express = require('express');
const auth = require('../../middlewares/auth');
const userController = require('../../controllers/user.controller');
const router = express.Router();
router.post('/users', auth('manageUsers'), userController.createUser);
```

In the example above, an authenticated user can access this route only if that user has the `manageUsers` permission.

The permissions are role-based. You can view the permissions/rights of each role in the `src/config/roles.js` file.

If the user making the request does not have the required permissions to access this route, a Forbidden (403) error is thrown.

## Logging

Import the logger from `src/config/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending order from most important to least important):

```javascript
const logger = require('<path to src>/config/logger');
logger.error('message'); // level 0
logger.warn('message'); // level 1
logger.info('message'); // level 2
logger.http('message'); // level 3
logger.verbose('message'); // level 4
logger.debug('message'); // level 5
```

In development mode, log messages of all severity levels will be printed to the console.

In production mode, only `info`, `warn`, and `error` logs will be printed to the console.\
It is up to the server (or process manager) to actually read them from the console and store them in log files.\
This app uses pm2 in production mode, which is already configured to store the logs in log files.

Note: API request information (request url, response code, timestamp, etc.) are also automatically logged (using [morgan](https://github.com/expressjs/morgan)).

## Custom Mongoose Plugins

The app also contains 2 custom mongoose plugins that you can attach to any mongoose model schema. You can find the plugins in `src/models/plugins`.

```javascript
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const userSchema = mongoose.Schema(
    {
        /* schema definition here */
    },
    { timestamps: true }
);
userSchema.plugin(toJSON);
userSchema.plugin(paginate);
const User = mongoose.model('User', userSchema);
```

### toJSON

The toJSON plugin applies the following changes in the toJSON transform call:

-   removes \_\_v, createdAt, updatedAt, and any schema path that has private: true
-   replaces \_id with id

### paginate

The paginate plugin adds the `paginate` static method to the mongoose schema.

Adding this plugin to the `User` model schema will allow you to do the following:

```javascript
const queryUsers = async (filter, options) => {
    const users = await User.paginate(filter, options);
    return users;
};
```

The `filter` param is a regular mongo filter.

The `options` param can have the following (optional) fields:

```javascript
const options = {
    sortBy: 'name:desc', // sort order
    limit: 5, // maximum results per page
    page: 2, // page number
};
```

The plugin also supports sorting by multiple criteria (separated by a comma): `sortBy: name:desc,role:asc`

The `paginate` method returns a Promise, which fulfills with an object having the following properties:

```json
{
    "results": [],
    "page": 2,
    "limit": 5,
    "totalPages": 10,
    "totalResults": 48
}
```

## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

In this app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) with some modifications. It also extends [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to turn off all rules that are unnecessary or might conflict with Prettier.

# Deploy-Node-JS-and-Mysql-to-AWS-EC2-VPS

## Create new instance (AWS)

## Configuring the Firewall on your Cloud

Check firewall: `sudo ufw status`

```bash
sudo ufw app list
```

-   So let us config the Firewall and allow those ports by

    ```bash
    sudo ufw allow 'Nginx Full'
    ```

    ```bash
    sudo ufw allow 'OpenSSH'
    ```

    ```bash
    sudo ufw enable
    ```

## 1. Install NodeJS

```bash
curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh
```

run script

```bash
sudo bash nodesource_setup.sh
```

Install NodeJS

```bash
sudo apt install nodejs
```

## Setup MongoDB (local)

We are using MongoDB as a database, and so we can install it my following the documentation https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

-   Import the public key used by the package management system
    ```
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
    ```
-   Create a list file for MongoDB (Ubuntu 16.04)
    ```
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
    ```
-   Reload local package database
    ```
    sudo apt-get update
    ```
-   Install the latest stable version of MongoDB
    ```
    sudo apt-get install -y mongodb-org
    ```
-   Start MongoDB by running (default port: 27017)
    ```
    sudo service mongod start
    ```
-   Stop MongoDB by running
    ```
    sudo service mongod stop
    ```
-   Restart MongoDB by running
    ```
    sudo service mongod restart
    ```

## 2. Install and config MY-SQL

-   Update ubuntu and Install MY-SQL

    ```bash
     $ sudo apt update
    ```

    ```bash
     $ sudo apt install mysql-server
    ```

-   Config MY-SQL

    ```bash
     $ sudo mysql_secure_installation
    ```

-   Change method authenticated user to mysql_native_password

    ```bash
     $ sudo mysql
    ```

    ```
    mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';
    ```

    ```
    mysql> exit
    ```

-   Test connect mysql

    ```bash
     $ mysql -u root -p
    ```

    Enter password: 12345678

    ```
    mysql> exit
    ```

## 3. Install and Run app in background using PM2

-   Install PM2

    ```bash
    $ sudo npm i pm2@latest -g
    ```

-   Start app with app name = demo

    ```
    sudo pm2 start server.js --name "nhuydev" --watch
    ```

## 4. Install nginx and config

```bash
sudo apt-get update
sudo apt-get install nginx
systemctl status nginx
```

-   Config: Các cấu hình của NGINX mặc định được lưu ở thư mục /etc/nginx. Trong nội dung bài viết này mình sẽ quan tâm đến hai thư mục là sites-available và sites-enabled. Cụ thể mình sẽ viết các tập tin cấu hình ở sites-available và khi nào muốn kích hoạt cấu hình đó ta sẽ symlink tập tin cấu hình vào thư mục sites-enabled.
-   Mình sẽ tạo tập tin cấu hình /etc/nginx/sites-available/api.quanlycongviec.cf với nội dung sau. Cụ thể là sẽ chuyển các request từ port 80 đi từ domain api.quanlycongviec.cf về localhost:3001.

```bash
server {
  listen 80;
  server_name api.quanlycongviec.cf;
  location / {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
   }
}
```

Tiếp theo là symlink vào thư mục sites-enabled để NGINX sử dụng cấu hình này.

```bash
sudo ln -s /etc/nginx/sites-available/api.quanlycongviec.cf /etc/nginx/sites-enabled
```

Kiểm tra: `nginx -t`
Reload: `sudo systemctl reload nginx`

###Bonus

```bash
sudo systemctl stop nginx # tắt NGINX
sudo systemctl start nginx # bật NGINX
sudo systemctl restart nginx # khởi động lại NGINX
sudo systemctl reload nginx # nếu bạn chỉ thay đổi cấu hình của NGINX thì chỉ cần reload để tránh làm rớt các kết nối hiện tại vào NGINX
sudo systemctl disable nginx # không tự kích hoạt NGINX khi khởi động hệ thống
sudo systemctl enable nginx # tự kích hoạt NGINX khi khởi động hệ thống
```

## 5. Sử dụng Certbot để cấu hình https
```bassh
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update

sudo apt-get install certbot python3-certbot-nginx
```

Use `sudo certbot --nginx`

---

## Bonus

-   Can stop app using

    ` sudo pm2 stop all`

-   Can Reload app using

    `sudo pm2 reload all`

---

## **_ ------------ Done and thank's very much (Nhuydev) ------------ _**

