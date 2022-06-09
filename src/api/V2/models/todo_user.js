"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo_users extends Model {
    static associate(models) {}
  }
  Todo_users.init(
    {
      user_id: DataTypes.INTEGER,
      todo_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Todo_users",
    }
  );
  return Todo_users;
};
