'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Favourites extends Model {
        static associate(models) {
            // Favourites.hasMany(models.News, {
            //     as: 'news',
            // });

            Favourites.belongsTo(models.Tours, {
                as: 'tour',
                foreignKey: 'Tour_Id',
            });

            Favourites.belongsTo(models.Customers, {
                as: 'user',
                foreignKey: 'User_Id',
            });
        }
    }
    Favourites.init(
        {
            User_Id: DataTypes.INTEGER,
            Tour_Id: DataTypes.INTEGER,
        },
        {
            sequelize,
            tableName: 'Favourites',
            modelName: 'Favourites',
            timestamps: false,
            // createdAt: 'CreatedDate',
        }
    );
    return Favourites;
};
