const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const CustomizeSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  product: {
    type: Schema.ObjectId,
    ref: "Product",
  },
  frontJson: {
    type: String,
    default: `{"version":"5.2.4","objects":[]}`,
  },
  productColor: {
    type: Schema.ObjectId,
    ref: "ProductColor",
  },
  updated: {
    type: Boolean,
    default: false,
  },

  backJson: {
    type: String,
    default: `{"version":"5.2.4","objects":[]}`,
  },
  leftJson: {
    type: String,
    default: `{"version":"5.2.4","objects":[]}`,
  },
  rightJson: {
    type: String,
    default: `{"version":"5.2.4","objects":[]}`,
  },
  orderCount: {
    type: Number,
    default: 0,
  },
  frontImageFile: {
    type: String,
  },
  backImageFile: {
    type: String,
  },
  leftImageFile: {
    type: String,
  },
  rightImageFile: {
    type: String,
  },
  order: {
    type: Boolean,
    default: false,
  },
  designCount: {
    type: Number,
    default: 0,
  },
});

const Customize =
  mongoose.models.Customize || mongoose.model("Customize", CustomizeSchema);

module.exports = Customize;
