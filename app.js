const {userProfileRouter} = require('./routes/userProfileRoute.js');
const {productRouter} = require('./routes/productsRoutes.js');
const {orderRouter} = require('./routes/orderRoutes.js')
const {userAccountRouter} = require('./routes/userAccountsRoutes.js');
const {wholeSellerAccountRouter} = require('./routes/wholeSellerAccountsRoutes.js')
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');

require('dotenv').config({
    path: './.env'
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/user',userProfileRouter);
app.use('/products',productRouter);
app.use('/orders',orderRouter);
app.use('/userAccount',userAccountRouter);
app.use('/wholeSellerAccount',wholeSellerAccountRouter);


try{
 mongoose.connect('mongodb://127.0.0.1:27017/AccessStore');   

 app.listen(3001,()=>{
    console.log('Server is listening on port 3001');
});

}catch(err){

    console.log(err);
}


