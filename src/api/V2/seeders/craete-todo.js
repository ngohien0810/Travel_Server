"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Todos", [
      {
        title: "Công việc 1",
        notes: "Làm nhanh em nhé",
        startDate: "2000-01-01",
        dueDate: "2000-01-01",
        completed: 1,
        starred: 0,
        important: 0,
        selected: 0,
        deleted: 0,
        labels: "[1]",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Todos", null, {});
  },
};
