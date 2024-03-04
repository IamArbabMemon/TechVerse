const {wholeSellerAccountModel} = require('../models/wholeSellerAccountsModel');

async function getWholeSellerAccountDetails(req,res){
    if(!req.params.accountNumber)
        return res.status(400).json({error:'Empty Request Parameters'});

    try{

        const wholeSellerAccountDetails = await wholeSellerAccountModel.findOne({accountNumber:req.params.accountNumber});
        
        if(!wholeSellerAccountDetails)
        return res.status(404).json({error:'User Not Found'});

        return res.status(200).json(wholeSellerAccountDetails);

    }catch(err){
        console.log(err);
        return res.send(400).json({error:err});
    } 
}

module.exports = {
    getWholeSellerAccountDetails
}

//ObjectId("65707ab7f13f06d153a0ab49"),