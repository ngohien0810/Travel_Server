const express = require('express');
const OrderController = require('./Order.Controller');
const router = express.Router();

router.route('/orders').get(OrderController.getOrders).post(OrderController.createOrder);
router.route('/orders/:id').patch(OrderController.changeStatus).delete(OrderController.deleteOrder);
router.route('/ordersStatus/:id').put(OrderController.changeTourStatus);

router.route('/contact').post(OrderController.createContact);

module.exports = router;
