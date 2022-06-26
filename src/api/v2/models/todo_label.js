"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TodoLabels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TodoLabels.init(
    {
      handle: DataTypes.STRING,
      title: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TodoLabels",
    }
  );
  return TodoLabels;
};
