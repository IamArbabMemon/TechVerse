const {userAccountModel} = require('../models/userAccountsModel');

async function getUserAccountDetails(req,res){
    if(!req.params.accountNumber)
        return res.status(400).json({error:'Empty Request Parameters'});

    try{

        const userAccountDetails = await userAccountModel.findOne({accountNumber:req.params.accountNumber});
        
        if(!userAccountDetails)
        return res.status(404).json({error:'User Not Found'});

        return res.status(200).json(userAccountDetails);

    }catch(err){
        console.log(err);
        return res.send(400).json({error:err});
    } 
}

module.exports = {
    getUserAccountDetails
}