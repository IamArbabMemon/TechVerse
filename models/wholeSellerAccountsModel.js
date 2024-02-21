const mongoose = require('mongoose');

const wholeSellerAccountSchema = new mongoose.Schema({

    accountNumber:{
        type: String,
        unique:true
    },

    totalSale:{
        type:Number,
        default:0
    },

    ordersHistory:[{type:mongoose.Schema.Types.ObjectId,ref:'orders'}]


},{timestamps:true});


const wholeSellerAccountModel = mongoose.model('wholeseller_accounts',wholeSellerAccountSchema);

module.exports = {
    wholeSellerAccountModel
}