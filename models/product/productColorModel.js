const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ProductColorSchema = new Schema({
   product: {
      type: Schema.ObjectId,
      ref: "Product",
   },
   colorName: {
      type: String,
   },
   colorCode: {
      type: String,
   },
   productSize: [
      {
         type: Schema.ObjectId,
         ref: "ProductSize",
      },
   ],
   productPhotos: {
      thumbnailImg: {
         type: String,
      },
      productImg: {
         type: String,
      },
      leftImg: {
         type: String,
      },
      rightImg: {
         type: String,
      },
      frontImg: {
         type: String,
      },
      backImg: {
         type: String,
      },
   },
});

module.exports = mongoose.models?.ProductColor || mongoose.model("ProductColor", ProductColorSchema);
