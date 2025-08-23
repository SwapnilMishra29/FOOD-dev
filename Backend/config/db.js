import mongoose from "mongoose";

export const connectDB = async ()=> {
    await mongoose.connect('mongodb+srv://mishraswapnil610:l2A9r1i0@cluster0.igytio9.mongodb.net/food-del?retryWrites=true&w=majority&appName=Cluster0')
    .then(()=>console.log("DB connected"));
}