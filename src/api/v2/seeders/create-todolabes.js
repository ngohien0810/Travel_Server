"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TodoLabels", [
      {
        handle: "bug",
        title: "Xử lý",
        color: "red",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TodoLabels", null, {});
  },
};
