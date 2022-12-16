'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Orders extends Model {
        static associate(models) {
            Orders.belongsTo(models.Customers, {
                // through: 'todo_users',
                // as: 'users',
                foreignKey: 'CustomerID',
            });
            // Orders.hasMany(models.Todo_Comments, {
            //     as: 'comments',
            // });
        }
    }
    Orders.init(
        {
            Code: DataTypes.STRING,
            CodeTour: DataTypes.STRING,
            CustomerID: DataTypes.INTEGER,
            AdultTicket: DataTypes.STRING,
            ChildTicket: DataTypes.STRING,
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
