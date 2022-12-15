'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            Code: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            CodeTour: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            Name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            Phone: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            PaymentMethod: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            TotalPrice: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            CreatedDate: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            StatusOrder: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Orders');
    },
};
