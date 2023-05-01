const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const promotionSchema = new Schema(
  {
    promotionName: {
      type: String,
    },
    photo: {
      type: String,
    },
    visibility: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Promotion = mongoose.model("Promotion", promotionSchema);

module.exports = Promotion;
