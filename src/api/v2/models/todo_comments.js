'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Todo_Comments extends Model {
        static associate(models) {
            Todo_Comments.belongsTo(models.Todos, {
                as: 'todos',
                foreignKey: 'todoId',
            });
        }
    }
    Todo_Comments.init(
        {
            name: DataTypes.STRING,
            avatar: DataTypes.STRING,
            message: DataTypes.STRING,
            todoId: DataTypes.INTEGER,
            sentAt: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Todo_Comments',
        }
    );
    return Todo_Comments;
};
