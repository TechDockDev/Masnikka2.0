const User = require("../../models/user/userModel");
const Promotion = require("../../models/product/promotionModel");

exports.getPromotionList = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const promotionList = await Promotion.find({ visibility: true})
      .select("_id promotionName photo")
      .sort({ _id: -1 })
      // .skip(skip)
      // .limit(limit);
    res.status(200).json({
      status: "success",
      message: "Promotion List",
      data: promotionList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

