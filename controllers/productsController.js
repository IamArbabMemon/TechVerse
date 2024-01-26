const {productsCollection} = require('../models/productModel');

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
 

module.exports = {
    getAllProducts,
    getProductsByCategory,
    getProductsByName,
    getProductsByNameAndCategory
}

