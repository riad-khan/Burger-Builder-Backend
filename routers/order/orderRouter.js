const express = require('express');
const router = express.Router();
const {Order} = require('../../models/Order');
const auth = require('../../middlewares/authCheck/auth')


const newOrder = async(req,res) =>{
    const order = new Order(req.body)
    try{
        await order.save();
        return res.status(200).send("order placed successfully")
    }
    catch(error){
        res.send("something went wrong");
    }
}   

const getOrders = async(req,res) =>{
   try{
    const orders = await Order.find({userId : req.user.id}).sort({orderTime : -1})
    res.send(orders)
   }catch(error){
        res.send(error);
   }
   
}

router.route('/')
    .get(auth, getOrders)
    .post(auth,newOrder)

module.exports = router;