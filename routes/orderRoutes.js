const express = require('express');
const orderRouter = express.Router();
const {placeOrder} = require('../controllers/orderController');

orderRouter.post('/placeOrder',placeOrder);

module.exports = {
    orderRouter
}