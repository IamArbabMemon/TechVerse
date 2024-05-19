const {userProfileModel,wholeSellerProfileModel} = require('../models/userProfileModel.js'); 
const {userAccountModel} = require('../models/userAccountsModel.js');
const {wholeSellerAccountModel} = require('../models/wholeSellerAccountsModel.js');
const {sendOTPEmail} = require('../utils/mailer.js');
const {tempCollection} = require('../models/TempModel.js');

const shortID = require('short-unique-id');
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

    await userAccountModel.create({
        accountNumber:req.body.accountNumber,
    });

   }catch(err){
    console.log(err);
    return res.status(400).json({message:err});
   }
   
   return res.json({message:'Success'});

})


userProfileRouter.post('/login',async(req,res)=>{
  
        if(!req.body)
          return res.status(400).json({message:'Empty body'});    

        const userpayload = await userProfileModel.findOne({businessName:req.body.businessName});
        

        const user = await userProfileModel.find({businessName:req.body.businessName})

        console.log(`user data`, user);
        
        if(!userpayload)
            return res.status(404).send('User not found');
                    
            const passIsCorrect = await bcrypt.compare(req.body.password,userpayload.password);

       if(!passIsCorrect)
                return res.status(404).json({message:'Wrong Password'})
        
        
        const token = await jwt.sign({businessName:req.body.businessName,password:req.body.password},secretKey);    
        
        return res.cookie('jsonToken',token).json({message:"Token has been set",token, userData:user});
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
     
          await wholeSellerAccountModel.create({
                accountNumber:req.body.accountNumber
          });
              

        }catch(err){
         console.log(err);
         return res.status(400).json({message:'something went wrong'});
        }
        
        return res.json({message:'Success'});
     
     });
     

     userProfileRouter.post('/wholeSellerLogin',async(req,res)=>{
        if(!req.body)
          return res.status(400).json({message:'Empty body'});    

        const userpayload = await wholeSellerProfileModel.findOne({businessName:req.body.businessName});
        
        if(!userpayload)
            return res.status(404).send('User not found');
                    
            const passIsCorrect = await bcrypt.compare(req.body.password,userpayload.password);

       if(!passIsCorrect)
       return res.status(404).json({error:'Wrong Password'});    
        
        
        const token = await jwt.sign({businessName:req.body.businessName,password:req.body.password},secretKey);    
        
        return res.cookie('jsonToken',token).json({message:"Token has been set",token, userData:userpayload});
});




userProfileRouter.get('/getUser/:businessName',async (req,res)=>{
        if(!req.params.businessName)
        return res.status(400).json({error:'EMPTY PARAMS IN URL'});

       try{

            const user = await userProfileModel.findOne({businessName:req.params.businessName});
            
            if(!user)
            return res.status(400).json({error:'USER NOT FOUND !!'});

           
            return res.status(200).json(user);


       }catch(err){
        return res.status(400).json({error:err});

       } 


});


userProfileRouter.get('/getWholeSeller/:businessName',async (req,res)=>{
  if(!req.params.businessName)
  return res.status(400).json({error:'EMPTY PARAMS IN URL'});

 try{

      const user = await wholeSellerProfileModel.findOne({businessName:req.params.businessName});
      
      if(!user)
      return res.status(400).json({error:'USER NOT FOUND !!'});

     
      return res.status(200).json(user);


 }catch(err){
  return res.status(400).json({error:err});

 } 


});




userProfileRouter.get('/getOTP/:email',async(req,res)=>{
        if(!req.params.email)
        return res.status(400).json({error:'EMPTY EMAIL IN PARAMETER'});

        try{

           const user = await userProfileModel.findOne({email:req.params.email});     

         if(!user){
           return res.status(404).json({error:'USER NOT FOUND'});      
         }
           
              const OTPGenerator = new shortID();
              const OTP = OTPGenerator.rnd();

              sendOTPEmail(OTP,'OTP CODE TO UPDATE PASSWORD',req.params.email);  
             
              await tempCollection.create({
                email:req.params.email,
                otp:OTP
              });

              return res.status(200).json({success:"OTP Has Been Sent"});

        }catch(err){
            console.log(err);
            return res.status(400).json({error:err});
        }

});





userProfileRouter.get('/wholeSeller/getOTP/:email',async(req,res)=>{
  if(!req.params.email)
  return res.status(400).json({error:'EMPTY EMAIL IN PARAMETER'});

  try{

     const user = await wholeSellerProfileModel.findOne({email:req.params.email});     
    console.log(user);
   if(!user)
      return res.status(404).json({error:'USER NOT FOUND'});      
     
     
        const OTPGenerator = new shortID();
        const OTP = OTPGenerator.rnd();

        sendOTPEmail(OTP,'OTP CODE TO UPDATE PASSWORD',req.params.email);  
       
        await tempCollection.create({
          email:req.params.email,
          otp:OTP
        });

        return res.status(200).json({success:"OTP Has Been Sent"});

  }catch(err){
      console.log(err);
      return res.status(400).json({error:err});
  }

});







  userProfileRouter.post('/updatePassword',async (req,res)=>{
    console.log("🚀 ~ userProfileRouter.post ~ req:", req.body)

      if(!req.body)
        return res.status(400).json({error:'Empty Request Body'});

      try{

          const tempUser = await tempCollection.findOne({email:req.body.email});      
          console.log("🚀 ~ userProfileRouter.post ~ tempUser:", tempUser)
          
          if(!(tempUser.otp ===req.body.otp))
          return res.status(400).json({error:'OTP NOT MATCHED'});

          const hashedPass = await bcrypt.hash(req.body.password,10);
        const user = await userProfileModel.findOneAndUpdate({email:req.body.email},{password:hashedPass});

        await tempCollection.deleteOne({otp:tempUser.otp});

          return res.status(200).json({success:'Password has been updated'});

      }catch(err){
        console.log(err);
        return res.status(400).json({error:err});
      } 
  });



  userProfileRouter.post('/wholeSeller/updatePassword',async (req,res)=>{
    if(!req.body)
      return res.status(400).json({error:'Empty Request Body'});

    try{
        const tempUser = await tempCollection.findOne({email:req.body.email});      
        if(!(tempUser.otp ===req.body.otp))
        return res.status(400).json({error:'OTP NOT MATCHED'});

        const hashedPass = await bcrypt.hash(req.body.password,10);
      const user = await wholeSellerProfileModel.findOneAndUpdate({email:req.body.email},{password:hashedPass});

      await tempCollection.deleteOne({otp:tempUser.otp});

        return res.status(200).json({success:'Password has been updated'});

    }catch(err){
      console.log(err);
      return res.status(400).json({error:err});
    } 
});




module.exports = {
    userProfileRouter
}