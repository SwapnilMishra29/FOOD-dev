import express from "express"
import { addToCart,removeFromCart,getCart } from "../controller/cartController.js"
import authMiddleWare from "../middlewares/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add",authMiddleWare,addToCart)
cartRouter.post("/remove",authMiddleWare,removeFromCart)
cartRouter.post("/get",authMiddleWare,getCart);

export default cartRouter;
