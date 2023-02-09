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
            Description: DataTypes.TEXT,
            ImageUrl: DataTypes.STRING,
            Status: DataTypes.INTEGER,
            IsActive: DataTypes.INTEGER,
            TourPrice: DataTypes.INTEGER,
            DateStartTour: DataTypes.STRING,
            CreatedDate: DataTypes.STRING,
            Views: DataTypes.INTEGER,
            IsHome: DataTypes.INTEGER,
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
