const express = require('express');
const OrderController = require('./Order.Controller');
const router = express.Router();

router.route('/orders').get(OrderController.getOrders).post(OrderController.createOrder);

module.exports = router;
