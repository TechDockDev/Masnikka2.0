const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const BrandSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model.Brand || mongoose.model("Brand", BrandSchema);

