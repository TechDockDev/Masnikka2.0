const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const addressSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
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
  defaultAddress: { type: Boolean, default: false },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
