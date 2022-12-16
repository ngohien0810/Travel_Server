'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Feedbacks', {
            ID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            Name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            Phone: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            Email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            Note: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            Rate: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            isActive: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            CreatedDate: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Feedbacks');
    },
};
