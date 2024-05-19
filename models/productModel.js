const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({

    item:{
        type:String,
        trim:true
    },

    category:{
        type:String,
        trim:true
    },

    price:{
        type:Number
    },

    quantity:{
        type:Number
    },

    description:{
        type:String,
        trim:true
    },

    image:[{
        type:String,
        trim:true
    }],

    storeName:{
        type:String,
        trim:true
    },

    storeOwnerProfileRef:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'wholeSellerProfiles',
        default:null
    }


},{timestamps:true})

const productsCollection = mongoose.model('products',productSchema);

module.exports = {
    productsCollection
}