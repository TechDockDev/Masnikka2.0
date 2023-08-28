const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },
    address: {
      name: { type: String },
      phoneNumber: {
        type: String,
      },
      houseNo: {
        type: String,
      },
      address: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      pinCode: { type: String },
    },
    transactionId: { type: Schema.ObjectId, ref: "Transaction" },

    customizedAmount: {
      type: Number,
      default: 0,
    },
    amount: {
      type: Number,
    },
    shippingAmount: {
      type: Number,
    },
    // couponCode: {
    //   type: String,
    //   default: 0,
    // },
    orderStatus: {
      type: String,
    },
    shipping: {
      type: Schema.ObjectId,
      ref: "Shipping",
    },
    rating: {
      type: Schema.ObjectId,
      ref: "Rating",
    },
    paymentStatus: {
      type: String,
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
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = Order;
