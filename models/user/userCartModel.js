const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("../user/userModel");
const Address = require("../user/userAddressModel");
const Product = require("../");

const cartSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },
    shippingAddress: {
      type: Schema.ObjectId,
      ref: "Address",
    },
    productList: [
      {
        product: {
          type: Schema.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 0,
        },
        attribute: [
          {
            type: Schema.ObjectId,
            ref: "Attribute",
          },
        ],
      },
    ],
    tax: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    totalShippingCost: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Carts", cartSchema);

module.exports = Cart;
