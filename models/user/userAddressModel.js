const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const addressSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  phoneNumber: {
    type: Number,
    min: [10, "Value must be at least 10"],
    required: true,
  },
  houseNo: {
    type: String,
  },
  address: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pinCode: { type: String, required: true },
  defaultAddress: { type: Boolean, default: false },
});

const Address =
  mongoose.models?.Address || mongoose.model("Address", addressSchema);

module.exports = Address;
