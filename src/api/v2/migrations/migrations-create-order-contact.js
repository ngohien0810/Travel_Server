'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('OrderContacts', {
            ID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            OrderID: {
                type: Sequelize.INTEGER,
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
            Email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            Note: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('OrderContacts');
    },
};
