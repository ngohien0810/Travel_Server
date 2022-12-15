'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Orders extends Model {
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
    Orders.init(
        {
            Code: DataTypes.STRING,
            CodeTour: DataTypes.STRING,
            Name: DataTypes.STRING,
            Phone: DataTypes.STRING,
            PaymentMethod: DataTypes.INTEGER,
            TotalPrice: DataTypes.INTEGER,
            CreatedDate: DataTypes.STRING,
            StatusOrder: DataTypes.INTEGER,
        },
        {
            sequelize,
            tableName: 'Orders',
            modelName: 'Orders',
            timestamps: false,
            // createdAt: 'CreatedDate',
        }
    );
    return Orders;
};
