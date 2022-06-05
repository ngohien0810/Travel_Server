const db = require("../models/index");

const getUser = async (req, res) => {
  try {
    // find all user
    const users = await db.User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUser,
};
