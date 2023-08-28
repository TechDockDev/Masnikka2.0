const fs = require("fs");
const {
  uploadImg,
  deleteFile,
  getFileStream,
} = require("./../../config/s3config");
const Customize = require("./../../models/user/customizeModel");
exports.uploadImageCustomize = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(200).json({
        status: "Success",
        message: "Please Provide a Image to Upload",
      });
      return;
    }

    const result = await uploadImg(file);
    photoKey = result.Key;
    res.status(201).json({
      status: "success",
      message: "Image Upload Success",
      imageKey: photoKey,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.createCustomize = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const customize = await Customize.create({
      user: userId,
      product: productId,
    });
    res.status(200).json({
      status: "success",
      message: "success",
      customize,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.editCustomize = async (req, res) => {
  try {
    console.log("ss");
    const { userId, customizeId } = req.params;
    const customize = await Customize.findById(customizeId);
    if (customize && customize.order === false) {
      if (customize.user.equals(userId)) {
        res.status(200).json({
          status: "success",
          message: "success",
          customize,
        });
      } else {
        const customizeNew = await Customize.create({
          user: userId,
          product: customize.product,
          frontJson: customize.frontJson,
          backJson: customize.backJson,
          leftJson: customize.leftJson,
          rightJson: customize.rightJson,

          frontImageFile: customize.frontImageFile,
          backImageFile: customize.backImageFile,
          leftImageFile: customize.leftImageFile,
          rightImageFile: customize.rightImageFile,
        });
        res.status(200).json({
          status: "success",
          message: "success",
          customize: customizeNew,
        });
      }
    } else {
      const customizeNew = await Customize.create({
        user: userId,
        product: customize.product,
        frontJson: customize.frontJson,
        backJson: customize.backJson,
        leftJson: customize.leftJson,
        rightJson: customize.rightJson,

        frontImageFile: customize.frontImageFile,
        backImageFile: customize.backImageFile,
        leftImageFile: customize.leftImageFile,
        rightImageFile: customize.rightImageFile,
      });
      res.status(200).json({
        status: "success",
        message: "success",
        customize: customizeNew,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.getSingleCustomize = async (req, res) => {
  try {
    const customize = await Customize.findById(req.params.customizeId);

    res.status(200).json({
      status: "success",
      message: "success",
      customize,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.updateCustomize = async (req, res) => {
  try {
    const { customizeData, productColor } = req.body;
    console.log(customizeData);
    const backCstmztn = JSON.parse(customizeData.backJson);
    const leftCstmztn = JSON.parse(customizeData.leftJson);
    const rightCstmztn = JSON.parse(customizeData.rightJson);
    const frontCstmztn = JSON.parse(customizeData.frontJson);
    const totalCustomization =
      backCstmztn.objects.length +
      leftCstmztn.objects.length +
      rightCstmztn.objects.length +
      frontCstmztn.objects.length;
    console.log("count " + totalCustomization);
    designCount = totalCustomization;
    const customize = await Customize.create({
      frontJson,
      backJson,
      leftJson,
      rightJson,
      productColor,
      designCount,
    });
    res.status(200).json({
      status: "success",
      message: "Design has been created successfully",
      customize,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.uploadCustomizeImageData = async (req, res) => {
  try {
    const customize = await Customize.findById(req.params.customizeId);
    let customizeImagesKeys = {
      leftImageFile: customize.leftImageFile,
      rightImageFile: customize.rightImageFile,
      frontImageFile: customize.frontImageFile,
      backImageFile: customize.backImageFile,
    };
    // Upload Files to Backend

    if (req.files["leftImg"]) {
      if (customize.leftImageFile) {
        await deleteFile(customize.leftImageFile);
      }
      const leftImg = req.files["leftImg"][0];
      const leftImgData = await uploadImg(leftImg);
      customize.leftImageFile = leftImgData.Key;
      fs.unlinkSync(leftImg.path);
    }
    if (req.files["rightImg"]) {
      if (customize.rightImageFile) {
        await deleteFile(customize.rightImageFile);
      }
      const rightImg = req.files["rightImg"][0];
      const rightImgData = await uploadImg(rightImg);
      customize.rightImageFile = rightImgData.Key;
      fs.unlinkSync(rightImg.path);
    }

    if (req.files["frontImg"]) {
      if (customize.frontImageFile) {
        await deleteFile(customize.frontImageFile);
      }
      const frontImg = req.files["frontImg"][0];
      const frontImgData = await uploadImg(frontImg);
      customize.frontImageFile = frontImgData.Key;
      fs.unlinkSync(frontImg.path);
    }
    if (req.files["backImg"]) {
      if (customize.backImageFile) {
        await deleteFile(customize.backImageFile);
      }
      const backImg = req.files["backImg"][0];
      const backImgData = await uploadImg(backImg);
      customize.backImageFile = backImgData.Key;
      fs.unlinkSync(backImg.path);
    }

    await customize.save();
    console.log(customizeImagesKeys);

    res
      .status(200)
      .json({ status: "success", message: "successfully uploaded Photo " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.getPhotos = async (req, res) => {
  try {
    const key = req.params.key;
    console.log(key);
    const readStream = await getFileStream(key);
    readStream.pipe(res);
  } catch (error) {
    console.log(error);
  }
};

exports.getMyDesignsWithLimit = async (req, res) => {
  try {
    const { page, limit } = req.params;
    const skip = page * limit - limit;
    const customize = await Customize.find({
      user: req.user._id,
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
      message: "success",
      customize,
      productCount,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.getPopularDesignsWithLimit = async (req, res) => {
  try {
    const { page, limit } = req.params;
    const skip = page * limit - limit;
    const customize = await Customize.find({
      updated: true,

      orderCount: { $gt: -1 },
    })
      .sort({ _id: -1 })
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
      updated: true,

      orderCount: { $gt: -1 },
    });
    res.status(200).json({
      status: "success",
      message: "success",
      customize,
      productCount,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
