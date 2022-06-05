const { Sequelize } = require("sequelize");
const { mysql } = require(".././../../config/index");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, {
  host: mysql.host,
  dialect: mysql.dialect,
  logging: false,
});

module.exports = sequelize;
