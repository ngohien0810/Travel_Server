'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Orders extends Model {
        static associate(models) {
            Orders.belongsTo(models.Customers, {
                // through: 'todo_users',
                as: 'customer',
                foreignKey: 'CustomerID',
            });

            // Orders.hasMany(models.Todo_Comments, {
            //     as: 'comments',
            // });

            // one to one relationship order and orderContact models
            // Orders.hasOne(models.OrderContacts, {
            //     as: 'orderContact',
            //     foreignKey: 'OrderID',
            // });
        }
    }
    Orders.init(
        {
            Code: DataTypes.STRING,
            CodeTour: DataTypes.STRING,
            CustomerID: DataTypes.INTEGER,
            // OrderID: DataTypes.INTEGER,
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
