'use strict';
const { Model } = require('sequelize');
const bcryptjs = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    class Customers extends Model {
        static associate(models) {
            // Categories.belongsToMany(models.User, {
            //     through: 'todo_users',
            //     as: 'users',
            //     foreignKey: 'todo_id',
            // });
            Customers.hasMany(models.Orders, {
                as: 'orders',
            });
        }
    }
    Customers.init(
        {
            Name: DataTypes.STRING,
            Gender: DataTypes.INTEGER,
            Address: DataTypes.INTEGER,
            Email: DataTypes.STRING,
            Role: DataTypes.STRING,
            DOB: DataTypes.STRING,
            Phone: DataTypes.STRING,
            Password: DataTypes.STRING,
            Status: DataTypes.STRING,
            WardID: DataTypes.STRING,
            DistrictID: DataTypes.STRING,
            ProvinceID: DataTypes.STRING,
            IsActive: DataTypes.STRING,
            CreatedDate: DataTypes.STRING,
            DeviceID: DataTypes.STRING,
            Token: DataTypes.STRING,
            Avatar: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: 'Customers',
            modelName: 'Customers',
            timestamps: false,
            // createdAt: 'CreatedDate',
        }
    );

    Customers.prototype.validPassword = async function (password) {
        return await bcryptjs.compare(password, this.Password);
    };
    return Customers;
};
