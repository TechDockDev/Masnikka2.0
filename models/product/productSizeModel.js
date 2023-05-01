const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ProductSizeSchema = new Schema({
  size: {
    type: Number,
  },
  productColor: {
    type: Schema.ObjectId,
    ref: "ProductColor",
  },
  product: {
    type: Schema.ObjectId,
    ref: "Product",
  },
  stock: {
    type: Number,
    default: 0,
  },
  unitPrice: {
    type: Number,
    default: 0,
  },
  customizePrice: {
    type: Number,
    default: 0,
  },
});

const ProductSize = mongoose.model("ProductSize", ProductSizeSchema);

module.exports = ProductSize;
