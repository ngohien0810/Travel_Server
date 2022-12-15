'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DestinationFavourites extends Model {
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
    DestinationFavourites.init(
        {
            CustomerID: DataTypes.STRING,
            DestinationID: DataTypes.INTEGER,
        },
        {
            sequelize,
            tableName: 'DestinationFavourites',
            modelName: 'DestinationFavourites',
            timestamps: false,
            // createdAt: 'CreatedDate',
        }
    );
    return DestinationFavourites;
    
};
