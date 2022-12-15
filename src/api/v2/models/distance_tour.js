'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DistanceTours extends Model {
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
    DistanceTours.init(
        {
            From: DataTypes.STRING,
            To: DataTypes.STRING,
            Distances: DataTypes.STRING,
            TimeTravel: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: 'DistanceTours',
            modelName: 'DistanceTours',
            timestamps: false,
            // createdAt: 'CreatedDate',
        }
    );
    return DistanceTours;
    
};
