'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrderContacts extends Model {
        static associate(models) {
            OrderContacts.belongsTo(models.Orders, {
                foreignKey: 'OrderID',
                as: 'order',
            });

            // OrderContacts.hasMany(models.Todo_Comments, {
            //     as: 'comments',
            // });
        }
    }
    OrderContacts.init(
        {
            OrderID: DataTypes.INTEGER,
            Name: DataTypes.STRING,
            Phone: DataTypes.STRING,
            Email: DataTypes.STRING,
            Note: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: 'OrderContacts',
            modelName: 'OrderContacts',
            timestamps: false,
            // createdAt: 'CreatedDate',
        }
    );
    return OrderContacts;
};
