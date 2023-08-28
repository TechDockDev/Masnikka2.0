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

module.exports = mongoose.models?.Brand || mongoose.model("Brand", BrandSchema);

