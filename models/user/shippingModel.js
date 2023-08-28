const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ShippingSchema = new Schema({
  order: {
    type: Schema.ObjectId,
    ref: "Order",
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },

  status: { type: String, default: "Not Yet" },
  shippedBy: {
    type: String,
  },
  shippingTrackingNo: {
    type: String,
  },
});

const Shipping = mongoose.models.Shipping || mongoose.model("Shipping", ShippingSchema);

module.exports = Shipping;
