const fs = require("fs");
const Brand = require("../../models/product/brandModel");
const Product = require("../../models/product/productModel");

const { uploadImg, deleteFile } = require("../../config/s3config");

exports.brandList = async (req, res) => {
  try {
    const brandList = await Brand.find({}).select("name photo");
    res.status(200).json({
      status: "success",
      message: "Available Brand List",
      data: brandList,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
exports.createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const brandCheck = await Brand.findOne({ name: name });
    console.log(brandCheck);
    if (!brandCheck) {
      const brandText = await Brand.create({ name });
      console.log(brandText);
      res.status(201).json({
        status: "success",
        message: "Brand Created Successfully",
        data: brandText,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Brand Already Exists",
        data: brandCheck,
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

exports.uploadBrandImage = async(req, res) => {
  try {
    const { id } = req.params;
    const brandText = await Brand.findById(id);
    if (brandText.photo) {
      await deleteFile(brandText.photo);
    }
    const brandImg = req.file;
    const response = await uploadImg(brandImg);
    brandText.photo = response.Key;
    await brandText.save();
    fs.unlinkSync(brandImg.path);
    res.status(200).json({
      status: "success",
      message: "Brand Image Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
};
exports.updateBrand = async (req, res) => {
  try {
    const { id, name } = req.body;
    const brandText = await Brand.findByIdAndUpdate(
      { _id: id },
      { name },
      { new: true }
    );
    res.status(201).json({
      status: "success",
      message: "Brand Updated Successfully",
      data: brandText,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      errors: error,
    });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brandText = await Brand.findById(id);
    if (!brandText) {
      res.status(204).json({
        status: "Error",
        message: "Plz Provide Brand Id is required",
      });
    } else {
      const brandProList = await Product.find({ brand: id });
      if (brandProList.length > 0) {
        brandProList.forEach(async (item, index) => {
          if (item.productPhotos) {
            if (item.productPhotos.thumbnailImg !== "") {
              await deleteFile(item.productPhotos.thumbnailImg);
            }
            if (item.productPhotos.productImg !== "") {
              await deleteFile(item.productPhotos.productImg);
            }
            if (item.productPhotos.leftImg !== "") {
              await deleteFile(item.productPhotos.leftImg);
            }
            if (item.productPhotos.rightImg !== "") {
              await deleteFile(item.productPhotos.rightImg);
            }
            if (item.productPhotos.frontImg !== "") {
              await deleteFile(item.productPhotos.frontImg);
            }
            if (item.productPhotos.backImg !== "") {
              await deleteFile(item.productPhotos.backImg);
            }
          }
          await Product.findByIdAndDelete(item._id);
        });
      }
      if (brandText.photo) {
        await deleteFile(brandText.photo);
      }
      await Brand.findByIdAndDelete(id);
      res.status(202).json({
        status: "success",
        message: "Brand Deleted Successfully",
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
