const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const cartSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },

  quantity: { type: Number },
  productSize: {
    type: Schema.ObjectId,
    ref: "ProductSize",
  },
  customized: {
    type: Boolean,
    default: false,
  },
  customize: {
    type: Schema.ObjectId,
    ref: "Customize",
  },
});

const Cart = mongoose.models?.Cart || mongoose.model("Cart", cartSchema);

module.exports = Cart;
