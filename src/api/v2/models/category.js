'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Categories extends Model {
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
    Categories.init(
        {
            Name: DataTypes.STRING,
            Status: DataTypes.INTEGER,
            isActive: DataTypes.INTEGER,
            Discriminator: DataTypes.INTEGER,
        },
        {
            sequelize,
            tableName: 'Categories',
            modelName: 'Categories',
            timestamps: false,
            createdAt: 'CreatedDate',
        }
    );
    return Categories;
};
