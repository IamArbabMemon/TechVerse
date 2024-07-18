const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({ 
  cloud_name: "cloud name here", 
api_key:"api key must be enter here",
 api_secret:"api secret must be enter here"

});

const uploadFileOnCloudinary = async (localfilePath)=>{
    if(!localfilePath)
        return null;

        try{
        const response = await cloudinary.uploader.upload(localfilePath,{ resource_type: "auto" });
        fs.unlinkSync(localfilePath);
        return response.url;
       
         }catch(error){
            fs.unlinkSync(localfilePath);
            console.log(error)
            return null;
        }

};

module.exports = {
  uploadFileOnCloudinary
}

