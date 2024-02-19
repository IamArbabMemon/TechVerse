const nodemailer = require('nodemailer');
const {COMPANY_EMAIL ,ACCOUNT_CREATION_TEXT} = require('../constants.js');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'rubye.fisher99@ethereal.email',
        pass: '8jQPm8QkMs7GB3ab6A'
    }
});

const sendMail = async (user,subject)=>{
    
    let textToSend = ACCOUNT_CREATION_TEXT;
    textToSend = textToSend.replace("[User]",user.username);
    textToSend =textToSend.replace("<accountID>",user.accountId)
    textToSend = textToSend.replace("<Password>",user.password);
    
    try{
        
        const info = await transporter.sendMail({
            from: `TechVerse Team <${COMPANY_EMAIL}>`, // sender address
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

export default sendMail;

