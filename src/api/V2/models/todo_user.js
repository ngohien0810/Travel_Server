"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TodoUser extends Model {
    static associate(models) {}
  }
  TodoUser.init(
    {
      user_id: DataTypes.INTEGER,
      todo_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TodoUser",
    }
  );
  return TodoUser;
};
