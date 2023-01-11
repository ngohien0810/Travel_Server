const express = require('express');
const OrderController = require('./Order.Controller');
const router = express.Router();

router.route('/orders').get(OrderController.getOrders).post(OrderController.createOrder);
router.route('/orders/:id').patch(OrderController.changeStatus);

module.exports = router;
