const Product = require("./../../models/product/productModel");
const ProductColor = require("./../../models/product/productColorModel");
const ProductSize = require("./../../models/product/productSizeModel");
const Wishlist = require("../../models/user/wishlistModel");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
exports.getProductWithLimit = async (req, res) => {
  try {
    const { page, limit } = req.params;
    const skip = page * limit - limit;
    const product = await Product.find({
      visibility: true,
    })
      .populate({ path: "brandId" })
      .populate({ path: "categoryId" })
      .populate({ path: "productColor", populate: { path: "productSize" } })
      .limit(limit)
      .sort({ _id: -1 })
      .skip(skip);
    const productCount = await Product.count({
      visibility: true,
    });
    res
      .status(200)
      .json({ productCount, product, status: "success", message: "success" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.searchProduct = async (req, res) => {
  try {
    const query1 = capitalizeFirstLetter(req.params.query);
    const query2 = req.params.query;

    const product = await Product.find({
      $or: [
        { name: { $regex: `${query1}` } },
        { name: { $regex: `${query2}` } },
      ],
      visibility: true,
    })
      .populate({ path: "brandId" })
      .populate({ path: "categoryId" })
      .populate({ path: "productColor", populate: { path: "productSize" } })
      .limit(20);

    res
      .status(200)
      .json({ status: "success", message: "Search Data", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({
      product: productId,
      user: req.user._id,
    });

    const product = await Product.findById(productId)
      .populate({ path: "brandId" })
      .populate({ path: "categoryId" })
      .populate({ path: "productColor", populate: { path: "productSize" } });

    res.status(200).json({
      product,
      status: "success",
      message: "success",
      wishlist: wishlist ? true : false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
exports.getGuestSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId)
      .populate({ path: "brandId" })
      .populate({ path: "categoryId" })
      .populate({ path: "productColor", populate: { path: "productSize" } });

    res.status(200).json({
      product,
      status: "success",
      message: "success",
      wishlist: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
exports.getSingleProductCustom = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId)
      .populate({ path: "brandId" })
      .populate({ path: "categoryId" })
      .populate({ path: "productColor", populate: { path: "productSize" } });

    res.status(200).json({
      product,
      status: "success",
      message: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
exports.getProductByCategory = async (req, res) => {
  try {
    const { page, limit } = req.params;
    const skip = page * limit - limit;
    const { categoryId } = req.params;

    const product = await Product.find({
      categoryId: categoryId,
      visibility: true,
    })
      .sort({ _id: -1 })
      .populate({ path: "brandId" })
      .populate({ path: "categoryId" })
      .populate({ path: "productColor", populate: { path: "productSize" } })
      .limit(limit)
      .skip(skip);
    const totalProducts = await Product.count({
      categoryId: categoryId,
      visibility: true,
    });
    res
      .status(200)
      .json({ product, status: "success", message: "success", totalProducts });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.getProductByBrand = async (req, res) => {
  try {
    const { brandId } = req.params;
    const { page, limit } = req.params;
    const skip = page * limit - limit;
    const product = await Product.find({ brandId: brandId, visibility: true })
      .populate({ path: "brandId" })
      .sort({ _id: -1 })
      .populate({ path: "categoryId" })
      .populate({ path: "productColor", populate: { path: "productSize" } })
      .limit(limit)
      .skip(skip);
    const totalProducts = await Product.count({
      brandId: brandId,
      visibility: true,
    });

    res
      .status(200)
      .json({ product, status: "success", message: "success", totalProducts });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
