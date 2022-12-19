'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Tours', {
            ID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            Code: {
                type: Sequelize.STRING,
            },
            Title: {
                type: Sequelize.STRING,
            },
            Description: {
                type: Sequelize.STRING,
            },
            ImageUrl: {
                type: Sequelize.STRING,
            },
            Status: {
                type: Sequelize.INTEGER,
            },
            isActive: {
                type: Sequelize.INTEGER,
            },
            TourPrice: {
                type: Sequelize.INTEGER,
            },
            DateStartTour: {
                type: Sequelize.STRING,
            },
            CreatedDate: {
                type: Sequelize.STRING,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Tours');
    },
};
