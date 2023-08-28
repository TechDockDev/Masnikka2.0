const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ProductSchema = new Schema({
  adminVisibility: {
    type: "boolean",
    default: true,
  },
  name: {
    type: String,
  },
  visibility: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
  brandId: {
    type: Schema.ObjectId,
    ref: "Brand",
  },
  categoryId: {
    type: Schema.ObjectId,
    ref: "Categories",
  },
  productColor: [
    {
      type: Schema.ObjectId,
      ref: "ProductColor",
    },
  ],
  taxPercent: {
    type: Number,
    default: 0,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  discountPercent: {
    type: Number,
    default: 0,
  },
  shippingCost: {
    type: Number,
    default: 0,
  },
  customization: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Schema.ObjectId,
    ref: "Admin",
  },
});

module.exports = mongoose?.models?.Product || mongoose.model("Product", ProductSchema);

