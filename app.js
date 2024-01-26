const {userProfileRouter} = require('./routes/userProfileRoute.js');
const {productRouter} = require('./routes/productsRoutes.js');
const {orderRouter} = require('./routes/orderRoutes.js')
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/user',userProfileRouter);
app.use('/products',productRouter);
app.use('/orders',orderRouter);



try{
 mongoose.connect('mongodb://127.0.0.1:27017/AccessStore')   
app.listen(3000,()=>{
    console.log('Server is listening');
});
}catch(err){
    console.log(err);
}


