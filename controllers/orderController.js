const {orderCollection} = require('../models/orderModel');


async function placeOrder(req,res){
console.log(req.body)

if(!req.body)
    return res.status(400).json({error:'empty request body'})

   
   try{

        const {productId,name,phoneNumber,province,city,area,street,houseNo,postalCode,storeName} = req.body

        const order = await orderCollection.create({    
            productId,
            customerDetails:{
                name,
                phoneNumber,
                address:{province,city,area,street,houseNo,postalCode}
            },
            storeName
        });

        console.log(order);

        res.status(200).json({message:'Order has been placed'});

    }catch(err){
        res.status(400).json({error:err});
    }


}

module.exports = {
    placeOrder
}