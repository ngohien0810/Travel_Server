"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("todo_users", [
      {
        user_id: 1,
        todo_id: 1,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("todo_users", null, {});
  },
};
