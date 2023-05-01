const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const couponSchema = new Schema({
  campaignName: {
    type: String,
  },
  adminVisibility: {
    type: Boolean,
    default: true,
  },
  couponCode: {
    type: String,
    required: true,
    unique: true,
  },
  discountType: {
    type: String,
    default: "Persent",
    enum: ["Amount", "Persent"]
  },
  discount:{
    type: Number,
    default: 0
  },
  expire: {
    type: Date,
    default: () => new Date(+new Date() + 7*24*60*60*1000)
  },
  visibility: {
    type: Boolean,
    default : true,
  },
  couponDescription: {
    type: String,
  }
},
{
    timestamps: true,
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
