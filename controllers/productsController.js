const {productsCollection} = require('../models/productModel');
const { wholeSellerProfileModel, userProfileModel } = require('../models/userProfileModel');
const { uploadFileOnCloudinary } = require('../utils/cloudinaryUploader');

async function getAllProducts(req,res){
    try{
      const allProducts = await productsCollection.find({}); 
      console.log(allProducts) 
       return res.json(allProducts); 
    }catch(err){
        return res.status(400).json({message:err});
    } 
};


async function getProductsByCategory(req,res){
    
   if(!req.params.category)
        return res.status(404).json({message:'please insert the parameter with request'});
        
    try{
        
        const products = await productsCollection.find({category:req.params.category});
        console.log(products);
       return res.json(products); 

     }catch(err){
        return res.status(400).json({message:err});
     } 
};


async function getProductsByNameAndCategory(req,res){
    
   if(!req.params.name || !req.params.category)
        return res.status(404).json({message:'please insert the parameter with request'});
        
    try{
        
        const products = await productsCollection.find({$and:[{item:req.params.name},{category:req.params.category}]});
        console.log(products);
       return res.json(products); 

     }catch(err){
        return res.status(400).json({message:err});
     } 
};


async function getProductsByName(req,res){
    
    console.log(req.params);
    if(!req.params.item)
         return res.status(400).json({message:'please insert the parameter with request'});
         
     try{
        
         const products = await productsCollection.find({item:req.params.item});
         return res.json(products); 
 
      }catch(err){
         return res.status(400).json({message:err});
      } 
 };
 



async function addProduct(req,res){
     if(!req.body)
        return res.status(400).json({error:"Empty request body"});

    try{

         const {item,category,price,quantity,description,storeName} = req.body;
         
         if(!req.files.image[0].path)
             return res.status(400).json({error:"Image is missing"});

        const image = await uploadFileOnCloudinary(req.files.image[0].path);

     
        const storeOwner = await userProfileModel.findOne({businessName:storeName});
        const storeOwnerProfileRef = storeOwner._id;

     const newProduct = await productsCollection.create({
            item,
            category,
            price,
            quantity,
            description,
            image,
            storeName,
            storeOwnerProfileRef
         });      
     
         return res.status(200).json(newProduct);

    }catch(err){
        return res.status(400).json({error:err});
    } 

}


module.exports = {
    getAllProducts,
    getProductsByCategory,
    getProductsByName,
    getProductsByNameAndCategory,
    addProduct
}

