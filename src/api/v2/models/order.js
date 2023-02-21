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

            Orders.belongsTo(models.Tours, {
                // through: 'todo_users',
                as: 'tour',
                foreignKey: 'TourID',
            });

            // Orders.hasMany(models.Todo_Comments, {
            //     as: 'comments',
            // });

            // one to one relationship order and orderContact models
            Orders.belongsTo(models.OrderContacts, {
                foreignKey: 'ContactID',
                as: 'contact',
            });
        }
    }
    Orders.init(
        {
            Code: DataTypes.STRING,
            CodeTour: DataTypes.STRING,
            CustomerID: DataTypes.INTEGER,
            TourID: DataTypes.INTEGER,
            AdultTicket: DataTypes.STRING,
            ChildTicket: DataTypes.STRING,
            PaymentMethod: DataTypes.INTEGER,
            TotalPrice: DataTypes.INTEGER,
            CreatedDate: DataTypes.STRING,
            StatusOrder: DataTypes.INTEGER,
            ContactID: DataTypes.INTEGER,
            tourStatus: DataTypes.INTEGER,
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
