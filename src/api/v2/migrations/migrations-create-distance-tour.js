'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('DistanceTours', {
            ID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            From: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            To: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            Distances: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            TimeTravel: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('DistanceTours');
    },
};
