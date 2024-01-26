const express = require('express');
const productRouter = express.Router();
const {getAllProducts,getProductsByCategory,getProductsByNameAndCategory, getProductsByName} = require('../controllers/productsController');


productRouter.get('/',getAllProducts);

productRouter.get('/:category',getProductsByCategory);

productRouter.get('/:category/:name',getProductsByNameAndCategory);

productRouter.get('/itemName/:item',getProductsByName);

module.exports = {
    productRouter
}



