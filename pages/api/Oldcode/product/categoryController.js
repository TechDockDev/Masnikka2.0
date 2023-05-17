const Category = require("../../models/product/categoriesModel");

exports.categoryList = async (req, res) => {
  try {
    const categoryList = await Category.find({});
    res.status(200).json({
      status: "success",
      message: "Available category List",
      data: categoryList,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryCheck = await Category.findOne({ name: name });
    if (!categoryCheck) {
      const categoryText = await Category.create({ name });
      res.status(201).json({
        status: "success",
        message: "category Created Successfully",
        data: categoryText,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "category Already Exists",
        data: categoryCheck,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      errors: error,
    });
  }
};
exports.updateCategory = async (req, res) => {
  try {
    const { id, name } = req.body;
    console.log(req.body);
    const categoryText = await Category.findByIdAndUpdate(
      { _id: id },
      { name },
      { new: true }
    );
    res.status(201).json({
      status: "success",
      message: "category Updated Successfully",
      data: categoryText,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      errors: error,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(204).json({
        status: "Error",
        message: "Plz Provide Category Id is required",
      });
    } else {
      // const categoryText = await Category.findById(id);
      await Category.findByIdAndDelete(id);

      res.status(202).json({
        status: "success",
        message: "Category Deleted Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      errors: error,
    });
  }
};
