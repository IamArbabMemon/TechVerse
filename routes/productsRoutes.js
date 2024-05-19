const express = require('express');
const productRouter = express.Router();
const {getAllProducts,getProductsByCategory,getProductsByNameAndCategory,getProductsById, getProductsByName,addProduct,deleteProduct,updateProduct,getProductByBusinessName} = require('../controllers/productsController');
const {upload} = require('../middlewares/multer.middleware.js');



productRouter.get('/allProducts',getAllProducts);

productRouter.get('/category/:category',getProductsByCategory);

productRouter.get('/:businessName',getProductByBusinessName);

productRouter.get('/item/:itemName',getProductsByName);

productRouter.get('/item_id/:Product_id',getProductsById);

productRouter.get('/category/:category/:name',getProductsByNameAndCategory);

productRouter.post('/addProduct',upload.fields([{name:'image',maxCount:4}]),addProduct);
//productRouter.post('/addProduct',upload.array('image',4),addProduct);

productRouter.delete('/deleteProduct/:productId',deleteProduct);

productRouter.post('/updateProduct',updateProduct);

//productRouter.get('/:businessName',getProductByBusinessName);

module.exports = {
    productRouter
}



