'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Destinations extends Model {
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
    Destinations.init(
        {
            Name: DataTypes.STRING,
            Status: DataTypes.STRING,
            ImageUrl: DataTypes.STRING,
            VideoUrl: DataTypes.STRING,
            Description: DataTypes.STRING,
            Longtitude: DataTypes.STRING,
            Latitude: DataTypes.STRING,
            OrderIndex: DataTypes.STRING,
            MapUrl: DataTypes.STRING,
            TourID: DataTypes.STRING,
            IsActive: DataTypes.STRING,
            CreatedDate: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: 'Destinations',
            modelName: 'Destinations',
            timestamps: false,
            // createdAt: 'CreatedDate',
        }
    );
    return Destinations;
    
};
