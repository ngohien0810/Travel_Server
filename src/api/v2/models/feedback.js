'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Feedbacks extends Model {
        static associate(models) {
            Feedbacks.belongsTo(models.Tours, {
                as: 'feedback',
                foreignKey: 'TodoID',
            });
        }
    }
    Feedbacks.init(
        {
            Name: DataTypes.STRING,
            Phone: DataTypes.INTEGER,
            TodoID: DataTypes.INTEGER,
            Email: DataTypes.STRING,
            Note: DataTypes.STRING,
            Rate: DataTypes.INTEGER,
            isActive: DataTypes.INTEGER,
            CreatedDate: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: 'Feedbacks',
            modelName: 'Feedbacks',
            timestamps: false,
            // createdAt: 'CreatedDate',
        }
    );
    return Feedbacks;
};
