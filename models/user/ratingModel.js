const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const RatingSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  value: {
    type: Number,
  },
  product: {
    type: Schema.ObjectId,
    ref: "Product",
  },
});

const Rating = mongoose.model("Rating", RatingSchema);

module.exports = Rating;
