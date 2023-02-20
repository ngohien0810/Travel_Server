const express = require('express');
const userController = require('./User.Controller');
const router = express.Router();

router.route('/users').get(userController.getUsers);
router
    .route('/users/:id')
    .patch(userController.changeStatus)
    .get(userController.detailUser)
    .delete(userController.deleteUser);

module.exports = router;
