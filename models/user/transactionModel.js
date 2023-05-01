const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const transactionSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  totalPrice: {
    type: String,
  },
  paymentStatus: {
    type: String,
  },
  order: [
    {
      type: Schema.ObjectId,
      ref: "Order",
    },
  ],
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
