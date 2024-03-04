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
                let { productId,name,phoneNumber,province,city,area,street,houseNo,postalCode,orderedBy,profit } = order
                
                let orderObj = await orderCollection.create({    
                    productId,
                    customerDetails:{
                        name,
                        phoneNumber,
                        address:{province,city,area,street,houseNo,postalCode}
                    },
                    orderedBy,
                    profit
                });
       
                const UserAccountNumber = ( await userProfileModel.findOne({businessName:orderedBy}) ).accountNumber;
                const wholeSellerAccountNumber = ( await userProfileModel.findOne({businessName:orderedBy}) ).accountNumber;
        
                await userAccountModel.findOneAndUpdate({accountNumber:UserAccountNumber},{$push:{ordersHistory:orderObj._id}});
                await wholeSellerAccountModel.findOneAndUpdate({accountNumber:wholeSellerAccountNumber},{$push:{ordersHistory:orderObj._id}});
        
            });
            
            res.status(200).json({message:'Orders has been placed'});    

        }

        const { productId,name,phoneNumber,province,city,area,street,houseNo,postalCode,orderedBy,profit } = req.body

        const order = await orderCollection.create({    
            productId,
            customerDetails:{
                name,
                phoneNumber,
                address:{province,city,area,street,houseNo,postalCode}
            },
            orderedBy,
            profit
        });

        const UserAccountNumber = ( await userProfileModel.findOne({businessName:orderedBy}) ).accountNumber;
        const wholeSellerAccountNumber = ( await userProfileModel.findOne({businessName:orderedBy}) ).accountNumber;

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

        const orderDetails = await orderCollection.findOneAndDelete({_id:orderId});
        await userAccountModel.findOneAndUpdate({accountNumber : ( await userProfileModel.findOne({businessName:orderDetails.orderedBy}) ).accountNumber} , { $pull:{'ordersHistory': new mongoose.Types.ObjectId(orderId)} });
        await wholeSellerAccountModel.findOneAndUpdate({accountNumber : ( await wholeSellerProfileModel.findOne({businessName:orderDetails.orderedBy}) ).accountNumber} , { $pull:{'ordersHistory': new mongoose.Types.ObjectId(orderId)} });
        
        return res.status(200).json({success:'Order has been deleted'});             

    }catch(err){
        res.status(500).json({error:err});
    }    

};


async function orderDelivered(req,res){
    if(!req.params.orderId)
    return res.status(400).json({error:'Empty orderId'});

    try{

        const order = await orderCollection.findById(req.params.orderId);
        const product = await productsCollection.findById(order.productId);

        
        const wholeSellerAccountNumber = ( await userProfileModel.findOne({businessName:order.orderedBy}) ).accountNumber;
        const wholeSellerAccountObject = await wholeSellerAccountModel.findOne({accountNumber:wholeSellerAccountNumber});
        
        const userAccountNumber = ( await userProfileModel.findOne({businessName:order.orderedBy}) ).accountNumber;
        const userAccountObject  = await userAccountModel.findOne({accountNumber:userAccountNumber});


        userAccountObject.totalProfit+=order.profit;
        userAccountObject.save();
        wholeSellerAccountObject.totalSale+=product.price;
        wholeSellerAccountObject.save();

        order.status = "Delivered";
        order.save();

        product.quantity -=1;
        product.save(); 

    return res.status(200).json({success:'Order has been delivered successfully'});

    }catch(err){
        res.status(400).json({error:err});
    }

}




module.exports = {
    placeOrder,
    cancelOrder,
    orderDelivered
}