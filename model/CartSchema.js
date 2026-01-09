import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true, 
  },
  wishList: [
    {
      bookID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
      onDelete:{
        type:Boolean,
        default:false
      },
    },
  ],
  cart: [
    {
      bookID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
      quantity: {
        type: Number,
        default: 1,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },

    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
