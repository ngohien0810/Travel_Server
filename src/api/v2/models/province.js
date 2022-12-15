'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Provinces extends Model {
        static associate(models) {
            // Provinces.belongsToMany(models.User, {
            //     through: 'todo_users',
            //     as: 'users',
            //     foreignKey: 'todo_id',
            // });
            // Provinces.hasMany(models.Todo_Comments, {
            //     as: 'comments',
            // });
        }
    }
    Provinces.init(
        {
            Code: DataTypes.STRING,
            Name: DataTypes.INTEGER,
            Type: DataTypes.INTEGER,
        },
        {
            sequelize,
            tableName: 'Provinces',
            modelName: 'Provinces',
            timestamps: false,
            // createdAt: 'CreatedDate',
        }
    );
    return Provinces;
    
};
