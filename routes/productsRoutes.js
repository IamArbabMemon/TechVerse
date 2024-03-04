const express = require('express');
const productRouter = express.Router();
const {getAllProducts,getProductsByCategory,getProductsByNameAndCategory, getProductsByName,addProduct,deleteProduct,updateProduct,getProductByBusinessName} = require('../controllers/productsController');
const {upload} = require('../middlewares/multer.middleware.js');


productRouter.get('/',getAllProducts);

productRouter.get('/:category',getProductsByCategory);

productRouter.get('/:category/:name',getProductsByNameAndCategory);

productRouter.get('/itemName/:item',getProductsByName);

productRouter.post('/addProduct',upload.fields([{name:'image',maxCount:1}]),addProduct);

productRouter.delete('/deleteProduct/:productId',deleteProduct);

productRouter.post('/updateProduct',updateProduct);

productRouter.get('/:businessName',getProductByBusinessName);

module.exports = {
    productRouter
}



