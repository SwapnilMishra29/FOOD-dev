import { request } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIP_SECRET_KEY)


// placing user order for frontend
const placeOrder = async(req,res) => {

    const frontend_url = "http://localhost:5174"
    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

      const line_items = req.body.items.map((item) => ({
    price_data: {
        currency: "inr",
        product_data: {
            name: item.name
        },
        unit_amount: item.price * 100 * 85 // assuming 85% for currency conversion
    },
    quantity: item.quantity
}));


       line_items.push({
        price_data:{
            currency:"inr",
            product_data:{
                name:"Delivery Charges"
            },
            unit_amount:2*100*85
        },
        quantity:1
       })

       const session = await stripe.checkout.sessions.create({
        line_items:line_items,
        mode:'payment',
        success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
       })

       res.json({success:true,session_url:session.url,session_id:session.id})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}


const verifyOrder = async (req, res) => { // sessionId should come from frontend
  try {
    const { success, orderId, sessionId } = req.body;
    
    if (!success) {
      return res.status(400).json({ success: false, message: "Payment failed" });
    }
    // Fetch session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment verified and order marked as paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment not completed" });
    }
  } catch (error) {
    console.log("Verification Error:", error);
    res.status(500).json({ success: false, message: "Server error during verification" });
  }
};


// user order for frontend
const userOrders = async(req,res) => {
   try {
       const orders = await orderModel.find({userId:req.body.userId});
       res.json({success:true,data:orders})
   } catch (error) {
      console.log("error");
      res.json({success:false,message:"Error"})
   }
}

// Listing orders for admin pannel
const listOrders = async(req,res)=>{
   try {
    const orders =await orderModel.find({});
    res.json({success:true,data:orders})
   } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
   }
}

// api for updating order status
const updateStatus = async (req,res) => {
    try {
       await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
       res.json({success:true,message:"Status Updated"})
    } catch (error) {
       console.log(error);
       res.json({success:false,message:"Error"})
    }
}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}