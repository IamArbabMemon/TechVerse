const express = require('express');
const orderRouter = express.Router();
const {placeOrder,cancelOrder,orderDelivered,getUserOrderHistory,getWholeSellerOrderHistory} = require('../controllers/orderController');

orderRouter.post('/placeOrder',placeOrder);
orderRouter.post('/cancelOrder/:orderId',cancelOrder);
orderRouter.post('/orderDelivered/:orderId',orderDelivered);
orderRouter.get('/getUserOrderHistory/:accountNumber',getUserOrderHistory);
orderRouter.get('/getWholeSellerOrderHistory/:accountNumber',getWholeSellerOrderHistory);

module.exports = {
    orderRouter
}