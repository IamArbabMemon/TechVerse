const mongoose = require('mongoose');

const userAccountsSchema = new mongoose.Schema({

    accountNumber:String,

    totalProfit:{
        type:Number,
        default:0
    },

    ordersHistory:[{type:mongoose.Schema.Types.ObjectId,ref:'orders'}]


},{timestamps:true});


const userAccountModel = mongoose.model('users_account',userAccountsSchema);

module.exports = {
    userAccountModel
}