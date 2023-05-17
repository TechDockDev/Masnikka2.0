const Category = require("../../models/product/categoriesModel");
const Product = require("../../models/product/productModel");

exports.getAllCategories = async (req, res) => {
  try {
    const categoryList = await Category.find({}).sort({ _id: -1 });
    res.status(200).json({
      status: "success",
      message: "Category list was successfully retrieved",
      data: categoryList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.getCategoryByLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;

    const categoryList = await Category.find({})
      .select("_id name")
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      status: "success",
      message: "Category list was successfully retrieved",
      data: categoryList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.getSingleCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const categoryList = await Category.findById(categoryId).select("name _id");
    res.status(200).json({
      status: "success",
      message: "Category List Fetched Successfully",
      data: categoryList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.getProductByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const categoryProducts = await Product.find({
      visibility: true,
      adminVisibility: true,
      category: categoryId,
    })
      .populate({
        path: "category",
        select: "name _id",
      })
      .sort({ _id: -1 })
      .populate({
        path: "brand",
        select: "name _id",
      })
      .populate({
        path: "variations",
        select: "_id name",
      });

    res.status(200).json({
      status: "success",
      message: "Category List Fetched Successfully",
      data: categoryProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error,
    });
  }
};
