'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Districts extends Model {
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
    Districts.init(
        {
            Code: DataTypes.INTEGER,
            Name: DataTypes.STRING,
            Type: DataTypes.STRING,
            ProvinceID: DataTypes.INTEGER,
        },
        {
            sequelize,
            tableName: 'Districts',
            modelName: 'Districts',
            timestamps: false,
            // createdAt: 'CreatedDate',
        }
    );
    return Districts;
    
};
