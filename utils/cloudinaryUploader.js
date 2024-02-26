const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({ 
  cloud_name: "dmuqar3zu", 
api_key:"219829672445948",
 api_secret:"F_CMK7WxaP_yy2RjAZiqv0iY1Sc"

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

