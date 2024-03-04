const mongoose = require('mongoose');

const tempCollectionSchema = new mongoose.Schema({
    email:String,
    otp:String
},

{timestamps:true}

);

const tempCollection = mongoose.model('tempCollection',tempCollectionSchema);

module.exports = {
    tempCollection
}
