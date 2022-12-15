'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tours extends Model {
        static associate(models) {
            // Tours.belongsToMany(models.User, {
            //     through: 'todo_users',
            //     as: 'users',
            //     foreignKey: 'todo_id',
            // });
            // Tours.hasMany(models.Todo_Comments, {
            //     as: 'comments',
            // });
        }
    }
    Tours.init(
        {
            Code: DataTypes.STRING,
            Title: DataTypes.STRING,
            Description: DataTypes.STRING,
            ImageUrl: DataTypes.STRING,
            Status: DataTypes.INTEGER,
            isActive: DataTypes.INTEGER,
            CreatedDate: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: 'Tours',
            modelName: 'Tours',
            timestamps: false,
            // createdAt: 'CreatedDate',
        }
    );
    return Tours;
};
