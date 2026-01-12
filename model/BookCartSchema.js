import mongoose from "mongoose";
const cartProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
  },
  
  quantity:{
    type:Number,
    default:1
  },
  isDeleted:{
    type:Boolean,
    default:false
  },
});


const cartproducts =mongoose.model('cartproduct',cartProductSchema)

export default cartproducts