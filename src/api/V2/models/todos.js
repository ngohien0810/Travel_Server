"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // belongsToMany to users
      Todos.belongsToMany(models.User, {
        through: "todo_user",
        as: "users",
        foreignKey: "user_id",
      });
    }
  }
  Todos.init(
    {
      title: DataTypes.STRING,
      notes: DataTypes.STRING,
      startDate: DataTypes.STRING,
      dueDate: DataTypes.STRING,
      completed: DataTypes.BOOLEAN,
      starred: DataTypes.BOOLEAN,
      important: DataTypes.BOOLEAN,
      selected: DataTypes.BOOLEAN,
      deleted: DataTypes.BOOLEAN,
      labels: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Todos",
    }
  );
  return Todos;
};
