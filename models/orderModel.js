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
    

    orderedBy:String,

    profit:Number,
    
    status:{
        type:String,
        default:"Pending"
    }

},{timestamps:true});

 const orderCollection = mongoose.model('orders',orderSchema);

module.exports = {
    orderCollection
}


/*

user accounts :

accountNumber: string,unique

total profit : number, default 0

orderHistory : orders[]

*/
