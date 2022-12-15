'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class  Customers extends Model {
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
    return  Customers;
    
};
