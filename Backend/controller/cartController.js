import userModel from "../models/userModel.js"


// Add items to user cart
const addToCart = async (req, res) => {
  try {
  
    const {userId,itemId } = req.body;


    // Check if values are provided
    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "User ID and Item ID are required" });
    }

    // Fetch user
    const userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Access cart data or initialize empty object
    let cartData = userData.cartData || {};

    // Update cart data
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    // Update user in database
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.error("AddToCart Error:", error);
    res.status(500).json({ success: false, message: "Error" });
  }
};


// remove items from user cart
const removeFromCart = async (req,res) => {
   try {
     let userData = await userModel.findById(req.body.userId);
     let cartData = await userData.cartData;
     if (cartData[req.body.itemId]>0) {
        cartData[req.body.itemId] -= 1;
     }
     await userModel.findByIdAndUpdate(req.body.userId,{cartData})
     res.json({success:true,message:"Remove from Cart"})
   } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
   }
}

// fetch User cart data



  const getCart = async (req, res) => {
  try {
    console.log("Fetching cart for user:", req.userId);
    const userData = await userModel.findById(req.body.userId);
    if (!userData) {
      console.error("User not found for ID:", req.body.userId);
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, cartData: userData.cartData || {} });
  } catch (error) {
    console.error("GetCart Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export{addToCart,removeFromCart,getCart}
