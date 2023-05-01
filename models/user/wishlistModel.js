const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WishlistSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },
    product: {
      type: Schema.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = Wishlist;
