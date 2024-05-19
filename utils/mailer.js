const nodemailer = require('nodemailer');
const {COMPANY_EMAIL ,ACCOUNT_CREATION_TEXT} = require('../constants.js');
require('dotenv').config({
    path: './.env'
});

const transporter = nodemailer.createTransport({
    service:"gmail",
    host: 'smtp.gmail.com',
    auth: {
        user: "arbabhere41@gmail.com",
        pass: "pmjq taov fanf qagj"
    }
});

const sendWelcomeMail = async (user,subject)=>{
    
    let textToSend = ACCOUNT_CREATION_TEXT;
    textToSend = textToSend.replace("[User]",user.username);
    textToSend =textToSend.replace("<accountID>",user.accountId)
    textToSend = textToSend.replace("<Password>",user.password);
    
    try{
        
        const info = await transporter.sendMail({
            from: {
                name:`TechVerse Team <${COMPANY_EMAIL}>`,
                address:process.env.USER
        }, // sender address
            to: user.email, // list of receivers
            subject: subject, // Subject line
            text: textToSend, // plain text body
            html:""// html body
          });

          return info;
      }catch(err){
        console.log("FAILED TO SEND EMAIL");
        return null;
    }

};

const sendOTPEmail = async (OTP,subject,email)=>{
    
    let textToSend = `HELLO DEAR USER YOUR OTP CODE IS :  ${OTP}`
    
    try{
        
        const info = await transporter.sendMail({
            from: {
                name:`TechVerse Team <${COMPANY_EMAIL}>`,
                address:process.env.USER
        }, // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            text: textToSend, // plain text body
            html:""// html body
          });

          return info;

      }catch(err){

        console.log("FAILED TO SEND EMAIL", err);
        return null;
    }

};


const sendLessQuantityAlert = async (productName,productId,email)=>{
    
    let textToSend = `HELLO DEAR WHOLESELLER YOUR PRODUCT ${productName} PRODUCT ID : ${productId} QUANTITY IS LESS THAN THE MINIMUM QUANITY ACCORDING TO THE TECH VERSE POLICY PLEASE ARRANGE THE QUANTITY THANKS :`;
    
    try{
        
        const info = await transporter.sendMail({
            from: {
                name:`TechVerse Team <${COMPANY_EMAIL}>`,
                address:process.env.USER
        }, // sender address
            to: email, // list of receivers
            subject: 'PRODUCT QUANTITY ALERT', // Subject line
            text: textToSend, // plain text body
            html:""// html body
          });

          return info;

      }catch(err){

        console.log("FAILED TO SEND EMAIL", err);
        return null;
    }

};




module.exports = {
sendWelcomeMail,
sendOTPEmail,
sendLessQuantityAlert
}

