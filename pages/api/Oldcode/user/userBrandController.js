const Brand = require("../../models/product/brandModel");

exports.getAllBrand = async (req, res) => {
  try {
    const brandList = await Brand.find({})
      .select("_id name photo")
      .sort({ _id: -1 });

    res.status(200).json({
      status: "success",
      message: "Brand list was successfully retrieved",
      data: brandList,
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

exports.getSingleBrand = async (req, res) => {
  try {
    const { brandId } = req.params;
    const brand = await Brand.findById(brandId).select("name photo");
    res.status(200).json({
      status: "success",
      message: "Brand was successfully retrieved",
      data: brand,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
