import saveDesign from "@/lib/saveDesign";
import Customize from "@/models/user/customizeModel";
import User from "@/models/user/userModel";
import Wishlist from "@/models/user/wishlistModel";
const bcrypt = require("bcrypt");

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        const { page, limit } = req.params;
        const skip = page * limit - limit;
        const customize2 = await Customize.find({
          user: req.headers.id,
          updated: true,
        })
          .populate({
            path: "productColor",
            populate: { path: "productSize" },
          })
          .populate({
            path: "product",
            populate: { path: "brandId" },
          })
          .skip(skip)
          .limit(limit);
        const productCount = await Customize.count({
          user: req.user._id,
          updated: true,
        });
        res.status(200).json({
          status: "success",
          message: "Designs have been fetched successfully",
          customize2,
          productCount,
        });
      case "POST":
        const { customizeData, productId, productColorId, size } = req.body;
        const backCstmztn = JSON.parse(customizeData.backJson);
        const leftCstmztn = JSON.parse(customizeData.leftJson);
        const rightCstmztn = JSON.parse(customizeData.rightJson);
        const frontCstmztn = JSON.parse(customizeData.frontJson);
        const designCount =
          backCstmztn.objects.length +
          leftCstmztn.objects.length +
          rightCstmztn.objects.length +
          frontCstmztn.objects.length;
        const frontImageFile = await saveDesign(
          Math.floor(10000 + Math.random() * 90000),
          customizeData.frontJson,
          size
        );
        const backImageFile = await saveDesign(
          Math.floor(10000 + Math.random() * 90000),
          customizeData.backJson,
          size
        );
        const leftImageFile = await saveDesign(
          Math.floor(10000 + Math.random() * 90000),
          customizeData.leftJson,
          size
        );
        const rightImageFile = await saveDesign(
          Math.floor(10000 + Math.random() * 90000),
          customizeData.rightJson,
          size
        );

        const customize = await Customize.create({
          user: req.headers.id,
          product: productId,
          productColor: productColorId,
          frontJson: customizeData.frontJson,
          backJson: customizeData.backJson,
          leftJson: customizeData.leftJson,
          rightJson: customizeData.rightJson,
          designCount,
          frontImageFile,
          backImageFile,
          leftImageFile,
          rightImageFile,
        });
        res.status(200).json({
          status: "success",
          message: "Design has been created successfully",
          customize,
        });
        break;
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
