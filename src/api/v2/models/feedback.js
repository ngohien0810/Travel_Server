'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Feedbacks extends Model {
        static associate(models) {
            // Categories.belongsToMany(models.User, {
            //     through: 'todo_users',
            //     as: 'users',
            //     foreignKey: 'todo_id',
            // });
            // Categories.hasMany(models.Todo_Comments, {
            //     as: 'comments',
            // });
        }
    }
    Feedbacks.init(
        {
            Name: DataTypes.STRING,
            Phone: DataTypes.INTEGER,
            Email: DataTypes.STRING,
            Note: DataTypes.STRING,
            Rate: DataTypes.INTEGER,
            isActive: DataTypes.INTEGER,
            CreatedDate: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: 'Feedbacks',
            modelName: 'Feedbacks',
            timestamps: false,
            // createdAt: 'CreatedDate',
        }
    );
    return Feedbacks;
};
