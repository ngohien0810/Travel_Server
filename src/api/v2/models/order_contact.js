'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrderContact extends Model {
        static associate(models) {
            OrderContact.belongsTo(models.Orders, {
                // through: 'todo_users',
                // as: 'users',
                foreignKey: 'OrderID',
            });

            // OrderContact.hasMany(models.Todo_Comments, {
            //     as: 'comments',
            // });
        }
    }
    OrderContact.init(
        {
            OrderID: DataTypes.INTEGER,
            Name: DataTypes.STRING,
            Phone: DataTypes.STRING,
            Email: DataTypes.STRING,
            Note: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: 'OrderContact',
            modelName: 'OrderContact',
            timestamps: false,
            // createdAt: 'CreatedDate',
        }
    );
    return OrderContact;
};
