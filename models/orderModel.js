const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    productId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
        default:null
    },

    customerDetails:{
          name: String,
          phoneNumber:String,
          address:{
            province:String,
            city:String,
            area:String,
            street:String,
            houseNo:String,
            postalCode:Number
          },
    },

    storeName:String

},{timestamps:true});

 const orderCollection = mongoose.model('orders',orderSchema);

module.exports = {
    orderCollection
}

// (
//     async ()=>{
//         const returned  = await orderModel.create({productId:"65707ab7f13f06d153a0ab4b",customerDetails:{name:'arbab',batch:6574,address:'thandi srak'}});
//         console.log(returned.customerDetails.address);
//         const product = await productModel.productsCollection.findById(returned.productId);
//         console.log(product);
//     }
// )()

