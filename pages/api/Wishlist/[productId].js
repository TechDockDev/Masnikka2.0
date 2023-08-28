import User from "@/models/user/userModel";
import Wishlist from "@/models/user/wishlistModel";
const bcrypt = require("bcrypt");

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        const wishlist = await Wishlist.findOne({
            user: req.headers.id,
            product: req.query.productId,
          });
          res.json({
            success: true,
            message: "Wishlist Item",
            wishlist: wishlist ? true : false,
          });
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
