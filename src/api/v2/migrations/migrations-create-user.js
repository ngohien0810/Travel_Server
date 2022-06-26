'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.STRING,
            avatar: { type: Sequelize.STRING, defaultValue: 'https://via.placeholder.com/150x150' },
            role: { type: Sequelize.STRING, defaultValue: 'user' },
            occupationGroup: { type: Sequelize.STRING, defaultValue: 'all' },
            isEmailVerified: { type: Sequelize.STRING, defaultValue: 'false' },
            createdAt: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false,
            },
            updatedAt: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
                allowNull: false,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    },
};
