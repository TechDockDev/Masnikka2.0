const Wishlist = require("./../../models/user/wishlistModel");

exports.addItemToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const wishlistData = await Wishlist.find({
      product: productId,
      user: req.user._id,
    });
    if (wishlistData.length === 0) {
      const wishlist = await Wishlist.create({
        product: productId,
        user: req.user._id,
      });
      console.log("added");

      res.status(200).json({ status: "success", message: "success", wishlist });
    } else {
      await Wishlist.findByIdAndRemove(wishlistData[0]._id);
      console.log("removed");
      res.status(200).json({ status: "success", message: "removed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.removeItemToWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndRemove(req.params.wishlistId);

    res.status(200).json({ status: "success", message: "deleted", wishlist });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// .populate({ path: "brandId" })
//       .populate({ path: "categoryId" })
//       .populate({ path: "productColor", populate: { path: "productSize" } })

exports.getWishlist = async (req, res) => {
  try {
    console.log("z");
    const wishlist = await Wishlist.find({
      user: req.user._id,
    })
      .populate({
        path: "product",
        populate: { path: "brandId" },
        populate: { path: "categoryId" },
        populate: { path: "productColor", populate: { path: "productSize" } },
      })
      .sort({ _id: -1 });

    res.status(200).json({ status: "success", message: "success", wishlist });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
