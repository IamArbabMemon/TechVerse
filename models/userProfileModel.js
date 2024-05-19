const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userProfileSchema = new mongoose.Schema({
    username:{
        type:String,
        trim:true
    },

    email:{
        type:String,
        unique:[true,"Email is already in used"],
        trim:true
    },

    businessName:{
        type:String,
        unique:[true,"Business name is already in used"],
        trim:true
    },

    address:{
        type:String,
        trim:true
    },

    accountType:{
        type:String
    },

    accountNumber :{
        type:String,
        unique:[true,"Account number is already in used"],
        trim:true
    },

    mobileNumber:{
        type:String,
        unique:[true,"Mobile number is already in use"],
        trim:true
    },

    password:{
        type:String,
        unique:true,
        trim:true
    }


},{timestamps:true}) 


const userProfileModel = mongoose.model('userProfiles',userProfileSchema);
const wholeSellerProfileModel = mongoose.model('wholeSellerProfiles',userProfileSchema);

module.exports = {
    userProfileModel,
    wholeSellerProfileModel
}
