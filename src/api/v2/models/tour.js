'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tours extends Model {
        static associate(models) {
            Tours.hasMany(models.Feedbacks, {
                as: 'feedbacks',
            });
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
            TourPrice: DataTypes.INTEGER,
            DateStartTour: DataTypes.STRING,
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
