const db = require("../../models/index");
const Sequelize = require("sequelize");
const getUser = async (req, res) => {
  try {
    // fi
    // const listLabels = await db.TodoLabels.findAll({ raw: true });
    // // find all user
    // db.Todos.findAll().then((result) => {
    //   result.forEach(async (todo) => {
    //     todo.dataValues.labels = JSON.parse(todo.dataValues.labels).map(
    //       (label_id) => {
    //         const data = listLabels.find((l) => l.id === Number(label_id));
    //         return data;
    //       }
    //     );
    //   });
    //   res.json(result);
    // });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUser,
};
