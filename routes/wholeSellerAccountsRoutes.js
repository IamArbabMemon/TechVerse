const express = require('express');
const wholeSellerAccountRouter = express.Router();
const {getWholeSellerAccountDetails} = require('../controllers/wholeSellerAccountContoller');

wholeSellerAccountRouter.get('/getAccountDetails/:accountNumber',getWholeSellerAccountDetails);

module.exports = {
    wholeSellerAccountRouter
}