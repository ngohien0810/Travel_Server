'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class News extends Model {
        static associate(models) {
            News.belongsTo(models.Categories, {
                as: 'category',
                foreignKey: 'CategoryID',
            });
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
            CategoryID: DataTypes.INTEGER,
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
