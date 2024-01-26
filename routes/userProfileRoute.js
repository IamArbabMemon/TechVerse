const {userProfileModel,wholeSellerProfileModel} = require('../models/userProfileModel.js'); 
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userProfileRouter = express.Router();
const secretKey = "mysecret647@456%$%^^^";
const cookieParser = require('cookie-parser');
userProfileRouter.use(cookieParser())



userProfileRouter.post('/signUp',async(req,res)=>{
   if(!req.body){
    return res.status(400).json({message:'Empty request body'});
   }      

   try{
    
    const hashedPass = await bcrypt.hash(req.body.password,10);
    await userProfileModel.create({
            username:req.body.username,
            email:req.body.email,
            businessName:req.body.businessName,
            address:req.body.address,
            accountType:req.body.accountType,
            accountNumber:req.body.accountNumber,
            mobileNumber:req.body.mobileNumber,
            password:hashedPass
    });

   }catch(err){
    console.log(err);
    return res.status(400).json({message:'something went wrong'});
   }
   
   return res.json({message:'Success'});

})


userProfileRouter.post('/login',async(req,res)=>{
        if(!req.body)
          return res.status(400).json({message:'Empty body'});    

        const userpayload = await userProfileModel.findOne({username:req.body.username});
        
        if(!userpayload)
            return res.status(404).send('User not found');
                    
            const passIsCorrect = await bcrypt.compare(req.body.password,userpayload.password);

       if(!passIsCorrect)
                return res.status(404).json({message:'Wrong Password'})
        
        
        const token = await jwt.sign({username:req.body.username,password:req.body.password},secretKey);    
        
        return res.cookie('jsonToken',token).json({message:"Token has been set"});
})



userProfileRouter.post('/wholeSellerSignUp',async(req,res)=>{
        if(!req.body){
         return res.status(400).json({message:'Empty request body'});
        }      
     
        try{
         
         const hashedPass = await bcrypt.hash(req.body.password,10);
         await wholeSellerProfileModel.create({
                 username:req.body.username,
                 email:req.body.email,
                 businessName:req.body.businessName,
                 address:req.body.address,
                 accountType:req.body.accountType,
                 accountNumber:req.body.accountNumber,
                 mobileNumber:req.body.mobileNumber,
                 password:hashedPass
         });
     
        }catch(err){
         console.log(err);
         return res.status(400).json({message:'something went wrong'});
        }
        
        return res.json({message:'Success'});
     
     })
     

     userProfileRouter.post('/wholeSellerLogin',async(req,res)=>{
        if(!req.body)
          return res.status(400).json({message:'Empty body'});    

        const userpayload = await wholeSellerProfileModel.findOne({username:req.body.username});
        
        if(!userpayload)
            return res.status(404).send('User not found');
                    
            const passIsCorrect = await bcrypt.compare(req.body.password,userpayload.password);

       if(!passIsCorrect)
                return res.send('Wrong password');
        
        
        const token = await jwt.sign({username:req.body.username,password:req.body.password},secretKey);    
        
        return res.cookie('jsonToken',token).json({message:"Token has been set"});
})


module.exports = {
    userProfileRouter
}