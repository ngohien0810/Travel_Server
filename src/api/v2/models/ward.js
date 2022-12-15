'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Wards extends Model {
        static associate(models) {
            // Wards.belongsToMany(models.User, {
            //     through: 'todo_users',
            //     as: 'users',
            //     foreignKey: 'todo_id',
            // });
            // Wards.hasMany(models.Todo_Comments, {
            //     as: 'comments',
            // });
        }
    }
    Wards.init(
        {
            Name: DataTypes.STRING,
            Type: DataTypes.INTEGER,
            DistrictID: DataTypes.INTEGER,
        },
        {
            sequelize,
            tableName: 'Wards',
            modelName: 'Wards',
            timestamps: false,
            // createdAt: 'CreatedDate',
        }
    );
    return Wards;
};
