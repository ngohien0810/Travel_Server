'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class News extends Model {
        static associate(models) {
            // News.belongsToMany(models.User, {
            //     through: 'todo_users',
            //     as: 'users',
            //     foreignKey: 'todo_id',
            // });
            // News.hasMany(models.Todo_Comments, {
            //     as: 'comments',
            // });
        }
    }
    News.init(
        {
            ImageUrl: DataTypes.STRING,
            Title: DataTypes.STRING,
            Status: DataTypes.INTEGER,
            Description: DataTypes.STRING,
            TypePost: DataTypes.STRING,
            UserID: DataTypes.INTEGER,
            IsActive: DataTypes.INTEGER,
            CreatedDate: DataTypes.STRING,
            IsHome: DataTypes.INTEGER,
        },
        {
            sequelize,
            tableName: 'News',
            modelName: 'News',
            timestamps: false,
            // createdAt: 'CreatedDate',
        }
    );
    return News;
};
