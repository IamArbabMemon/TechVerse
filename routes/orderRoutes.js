const express = require('express');
const orderRouter = express.Router();
const {placeOrder,cancelOrder,orderDelivered} = require('../controllers/orderController');

orderRouter.post('/placeOrder',placeOrder);
orderRouter.post('/cancelOrder/:orderId',cancelOrder);
orderRouter.post('/orderDelivered/:orderId',orderDelivered);

module.exports = {
    orderRouter
}