'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Todos extends Model {
        static associate(models) {
            Todos.belongsToMany(models.User, {
                through: 'todo_users',
                as: 'users',
                foreignKey: 'todo_id',
            });
            Todos.hasMany(models.Todo_Comments, {
                as: 'comments',
            });
        }
    }
    Todos.init(
        {
            title: DataTypes.STRING,
            notes: DataTypes.TEXT,
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
            modelName: 'Todos',
        }
    );
    return Todos;
};
