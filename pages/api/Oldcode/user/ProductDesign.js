const Customize = require("./../../models/user/customizeModel");

exports.getSingleDesign = async (req, res) => {
  try {
    const customize = await Customize.findById(req.params.customizeId)
      .populate({
        path: "product",
        populate: { path: "categoryId" },
        populate: { path: "brandId" },
      })
      .populate({ path: "productColor", populate: { path: "productSize" } });

    res.status(200).json({
      status: "success",
      message: "success",
      customize,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
