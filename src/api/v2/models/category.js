'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Categories extends Model {
        static associate(models) {
            Categories.hasMany(models.News, {
                as: 'news',
            });
        }
    }
    Categories.init(
        {
            Name: DataTypes.STRING,
            Status: DataTypes.INTEGER,
            IsActive: DataTypes.INTEGER,
            CreatedDate: DataTypes.STRING,
            Discriminator: DataTypes.INTEGER,
        },
        {
            sequelize,
            tableName: 'Categories',
            modelName: 'Categories',
            timestamps: false,
            // createdAt: 'CreatedDate',
        }
    );
    return Categories;
};
