const { default: mongoose } = require('mongoose');
const {orderCollection} = require('../models/orderModel');
const {userAccountModel} = require('../models/userAccountsModel');
const {userProfileModel,wholeSellerProfileModel} = require('../models/userProfileModel');
const { wholeSellerAccountModel } = require('../models/wholeSellerAccountsModel');
const { productsCollection } = require('../models/productModel');

async function placeOrder(req,res){
console.log(req.body)

if(!req.body)
    return res.status(400).json({error:'empty request body'})

   
   try{

        if(Array.isArray(req.body)){
            let arr = [] ;
            arr = req.body;
            
            arr.forEach(async (order)=>{
                // let { productId,name,phoneNumber,province,city,area,street,houseNo,postalCode,orderedBy,profit } = order
                let { productId,orderedBy,profit } = order;
                let customerDetails = order.customerDetails;
        
                let orderObj = await orderCollection.create({    
                    productId,
                    customerDetails:customerDetails,
                    orderedBy,
                    profit
                });
                console.log(productId);

                let product = await productsCollection.findById(productId);
                let storeName = product.storeName;


                let UserAccountNumber = ( await userProfileModel.findOne({businessName:orderedBy}) ).accountNumber;
                let wholeSellerAccountNumber = ( await wholeSellerProfileModel.findOne({businessName:storeName}) ).accountNumber;
        
                await userAccountModel.findOneAndUpdate({accountNumber:UserAccountNumber},{$push:{ordersHistory:orderObj._id}});
                await wholeSellerAccountModel.findOneAndUpdate({accountNumber:wholeSellerAccountNumber},{$push:{ordersHistory:orderObj._id}});
        
            });
            
            return res.status(200).json({message:'Orders has been placed'});    

        }

        const { productId,orderedBy,profit } = req.body;
        const customerDetails = req.body.customerDetails;

        const order = await orderCollection.create({    
            productId,
            customerDetails:customerDetails,
            orderedBy,
            profit
        });
        
        let product = await productsCollection.findById(productId);
        let storeName = product.storeName;

        const UserAccountNumber = ( await userProfileModel.findOne({businessName:orderedBy}) ).accountNumber;
        const wholeSellerAccountNumber = ( await wholeSellerProfileModel.findOne({businessName:storeName}) ).accountNumber;

        await userAccountModel.findOneAndUpdate({accountNumber:UserAccountNumber},{$push:{ordersHistory:order_id}});
        await wholeSellerAccountModel.findOneAndUpdate({accountNumber:wholeSellerAccountNumber},{$push:{ordersHistory:order_id}});

        res.status(200).json({message:'Order has been placed'});

    }catch(err){
        res.status(400).json({error:err});
    }


};


async function cancelOrder(req,res){
    if(!req.params.orderId)
        return res.status(400).json({error:'Empty orderID'});

    try{

        const orderDetails = await orderCollection.findOneAndDelete({_id:req.params.orderId});

        let product = await productsCollection.findById(orderDetails.productId);
        let storeName = product.storeName;


        await userAccountModel.findOneAndUpdate({accountNumber : ( await userProfileModel.findOne({businessName:orderDetails.orderedBy}) ).accountNumber} , { $pull:{'ordersHistory': new mongoose.Types.ObjectId(orderId)} });
        await wholeSellerAccountModel.findOneAndUpdate({accountNumber : ( await wholeSellerProfileModel.findOne({businessName:storeName}) ).accountNumber} , { $pull:{'ordersHistory': new mongoose.Types.ObjectId(orderId)} });
        
        return res.status(200).json({success:'Order has been deleted'});             

    }catch(err){
        res.status(500).json({error:err});
    }    

};


// async function orderDelivered(req,res){
//     if(!req.params.orderId)
//     return res.status(400).json({error:'Empty orderId'});

//     try{

//         const order = await orderCollection.findById(req.params.orderId);
//         const product = await productsCollection.findById(order.productId);

    
//         let storeName = product.storeName;

        
//         const wholeSellerAccountNumber = ( await userProfileModel.findOne({businessName:storeName}) ).accountNumber;
//         const wholeSellerAccountObject = await wholeSellerAccountModel.findOne({accountNumber:wholeSellerAccountNumber});
        
//         const userAccountNumber = ( await userProfileModel.findOne({businessName:order.orderedBy}) ).accountNumber;
//         const userAccountObject  = await userAccountModel.findOne({accountNumber:userAccountNumber});


//         userAccountObject.totalProfit+=order.profit;
//          userAccountObject.save();
//         wholeSellerAccountObject.totalSale+=product.price;
//         wholeSellerAccountObject.save();

//         order.status = "Delivered";
//          order.save();

//         product.quantity -=1;
//          product.save(); 

//     return res.status(200).json({success:'Order has been delivered successfully'});

//     }catch(err){
//         res.status(400).json({error:err});
//     }

// }


async function getUserOrderHistory(req,res){
    if(!req.params.accountNumber)
        return res.status(400).json({error:"Empty Query Parameter"});

     try{

        const user = await userAccountModel.findOne({accountNumber:req.params.accountNumber});
        
        if(!user)
            return res.status(404).json({error:"User not found"});

        const userOrderHistory = user.ordersHistory;
        let orders = [];
        
        userOrderHistory.forEach( async (orderId)=>{
            let element = await orderCollection.findById(orderId.toString());
            orders.push(element);
            
        });
        
        return res.status(200).json(orders);

     }catch(err){
        console.log(err);
        return res.status(500).json({error:err});
     }   
}



async function getWholeSellerOrderHistory(req,res){
    if(!req.params.accountNumber)
        return res.status(400).json({error:"Empty Query Parameter"});

     try{

        const user = await wholeSellerAccountModel.findOne({accountNumber:req.params.accountNumber});
        
        if(!user)
            return res.status(404).json({error:"Whole Seller not found"});

        const userOrderHistory = user.ordersHistory;
        let orders = [];
        
        userOrderHistory.forEach( async (orderId)=>{
            let element = await orderCollection.findById(orderId.toString());
            orders.push(element);
            
        });
        
        return res.status(200).json(orders);

     }catch(err){
        console.log(err);
        return res.status(500).json({error:err});
     }   
}






async function orderDelivered(req, res) {
    if (!req.params.orderId)
      return res.status(400).json({ error: 'Empty orderId' });
  
    try {
      const orderId = req.params.orderId;
  
      const order = await orderCollection.findById(orderId);
      const product = await productsCollection.findById(order.productId);
  
      let storeName = product.storeName;
  
      const wholeSellerAccountNumber = (await wholeSellerProfileModel.findOne({ businessName: storeName })).accountNumber;
      const userAccountNumber = (await userProfileModel.findOne({ businessName: order.orderedBy })).accountNumber;
  
      // Update user account totalProfit
      await userAccountModel.updateOne({ accountNumber: userAccountNumber }, { $inc: { totalProfit: order.profit } });
  
      // Update whole seller account totalSale
      await wholeSellerAccountModel.updateOne({ accountNumber: wholeSellerAccountNumber }, { $inc: { totalSale: product.price } });
  
      // Update order status to "Delivered"
      await orderCollection.updateOne({ _id: orderId }, { $set: { status: 'Delivered' } });
  
      // Update product quantity
      await productsCollection.updateOne({ _id: product._id }, { $inc: { quantity: -1 } });
  
      return res.status(200).json({ success: 'Order has been delivered successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  


module.exports = {
    placeOrder,
    cancelOrder,
    orderDelivered,
    getUserOrderHistory,
    getWholeSellerOrderHistory
}