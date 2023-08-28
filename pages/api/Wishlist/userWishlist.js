import User from "@/models/user/userModel";
import Wishlist from "@/models/user/wishlistModel";
const bcrypt = require("bcrypt");

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        const wishlist = await Wishlist.find({
          user: req.headers.id,
        })
          .populate({
            path: "product",
            populate: [
              { path: "brandId" },
              { path: "categoryId" },
              {
                path: "productColor",
                populate: { path: "productSize" },
              },
            ],
          })
          .sort({ _id: -1 });
        res.json({
          success: true,
          message: "Wishlist has been fetched successfully",
          wishlist,
        });
        break;
      case "POST":
        const wishlistData = await Wishlist.find({
          product: req.body.productId,
          user: req.headers.id,
        });
        if (wishlistData.length === 0) {
          const wishlist = await Wishlist.create({
            product: req.body.productId,
            user: req.headers.id,
          });
          res
            .status(200)
            .json({ status: "success", message: "success", wishlist });
        } else {
          await Wishlist.findByIdAndRemove(wishlistData[0]._id);
          res.status(200).json({ status: "success", message: "removed" });
        }
      case "DELETE":
        await Wishlist.findByIdAndDelete(req.query.wishlistId);
        res.status(200).json({
          status: "success",
          message: "Product removed successfully from wishlist",
        });
      default:
        break;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}
