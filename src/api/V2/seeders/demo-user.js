'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                name: 'Nguyễn Như Ý',
                email: 'nguyennhuy170400@gmail.com',
                password: '123456',
                role: 'admin',
                avatar: 'http://via.placeholder.com/150x150',
                occupationGroup: 'user',
                isEmailVerified: 'true',
            },
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    },
};
