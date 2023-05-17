const Product = require("../../models/product/productModel");
const fs = require("fs");
const { uploadImg, deleteFile } = require("../../config/s3config");

exports.productList = async (req, res) => {
  try {
    const ProductList = await Product.find({});
    res.status(200).json({
      status: "success",
      message: "Product List was successfully Fetched.",
      data: ProductList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate("brand")
      .populate("category")
      .populate("variations");
    res.status(200).json({
      status: "success",
      message: "Product was successfully Fetched.",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, brand, category, productPrice, variations } =
      req.body;
    const newVariations = [];
    await variations.forEach((element) => {
      newVariations.push(element._id);
    });
    const productText = await Product.create({
      name,
      description,
      brand,
      category,
      productPrice,
      variations: newVariations,
    });
    res.status(201).json({
      statusbar: "success",
      message: "Product Created Successfully",
      data: productText,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.productPhotosUpload = async (req, res) => {
  try {
    const {id} = req.params; 
    const productData = await Product.findById(id);
    console.log(req.files)
    let productImagesKeys = { 
      thumbnailImg: productData.productPhotos.thumbnailImg,
      productImg: productData.productPhotos.productImg,
      leftImg: productData.productPhotos.leftImg,
      rightImg: productData.productPhotos.rightImg, 
      frontImg: productData.productPhotos.frontImg,
      backImg: productData.productPhotos.backImg,
    };
    // Upload Files to Backend
    if (req.files["thumbnailImg"]) {
      if (productData.productPhotos.thumbnailImg){
        await deleteFile(productData.productPhotos.thumbnailImg);
      }
      const thumbnailImg = req.files["thumbnailImg"][0]; 
      const thumbnailImgData = await uploadImg(thumbnailImg);
      productImagesKeys.thumbnailImg = thumbnailImgData.Key;
      fs.unlinkSync(thumbnailImg.path);
    }
  
    if (req.files["productImg"]) {
      if (productData.productPhotos.productImg) {
        await deleteFile(productData.productPhotos.productImg);
      }
      const productImg = req.files["productImg"][0];
      const productImgData = await uploadImg(productImg);
      productImagesKeys.productImg = productImgData.Key;
      fs.unlinkSync(productImg.path);
    }
    if (req.files["leftImg"]) {
      if (productData.productPhotos.leftImg) {
        await deleteFile(productData.productPhotos.leftImg);
      }
      const leftImg = req.files["leftImg"][0];
      const leftImgData = await uploadImg(leftImg);
      productImagesKeys.leftImg = leftImgData.Key;
      fs.unlinkSync(leftImg.path);
    }
    if (req.files["rightImg"]) {
      if (productData.productPhotos.rightImg) {
        await deleteFile(productData.productPhotos.rightImg);
      }
      const rightImg = req.files["rightImg"][0];
      const rightImgData = await uploadImg(rightImg);
      productImagesKeys.rightImg = rightImgData.Key;
      fs.unlinkSync(rightImg.path);
    }
    if (req.files["frontImg"]) {
      if (productData.productPhotos.frontImg) {
        await deleteFile(productData.productPhotos.frontImg);
      }
      const frontImg = req.files["frontImg"][0];
      const frontImgData = await uploadImg(frontImg);
      productImagesKeys.frontImg = frontImgData.Key;
      fs.unlinkSync(frontImg.path);
    }
    if (req.files["backImg"]) {
      if (productData.productPhotos.leftImg) {
        await deleteFile(productData.productPhotos.leftImg);
      }
      const backImg = req.files["backImg"][0];
      const backImgData = await uploadImg(backImg);
      productImagesKeys.backImg = backImgData.Key;
      fs.unlinkSync(backImg.path);
    }
    productData.productPhotos = productImagesKeys;
    await productData.save();

    res.status(200).json({ 
      status: "success",
      message: "Product Successfully Created.",
      data: productData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
 };
 
 

exports.updateProductVisibility = async (req, res) => {
  try {
    const { id } = req.body;
    const productData = await Product.findById(id);
    console.log(productData);
    let productText = "";

    if (productData.visibility === false) {
      productText = await Product.findByIdAndUpdate(
        { _id: id },
        { visibility: true },
        { new: true }
      );
    } else {
      productText = await Product.findByIdAndUpdate(
        { _id: id },
        { visibility: false },
        { new: true }
      );
    }
    await productText.save();
    res.status(200).json({
      statusbar: "success",
      message: "Product Visibility Updated Successfully",
      data: productText,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error", 
      message: "Internal Server Error",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id, name, description, brand, category, productPrice, variations } =
      req.body;
    let categoryData = category; 
    let brandData = brand;
    const newVariations = [];
    await variations.forEach((element) => {
      newVariations.push(element._id);
    });
    const productText = await Product.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        name,
        description,
        brand: brandData,
        category: categoryData,
        productPrice: productPrice,
        variations: newVariations,
      },
      { new: true }
    );
    res.status(200).json({
      statusbar: "success",
      message: "Product Updated Successfully",
      data: productText,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.productPhotosUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = await Product.findById(id);
    let productImagesKeys = {
      thumbnailImg: "",
      productImg: "",
      leftImg: "",
      rightImg: "",
      frontImg: "",
      backImg: "",
    };
    // Upload Files to Backend
    if (req.files["thumbnailImg"]) {
 
      if (productData.productPhotos.thumbnailImg) {
        await deleteFile(productData.productPhotos.thumbnailImg);
      }
      const thumbnailImg = req.files["thumbnailImg"][0];
      const thumbnailImgData = await uploadImg(thumbnailImg);
      productImagesKeys.thumbnailImg = thumbnailImgData.Key;
      fs.unlinkSync(thumbnailImg.path);
    }
    if (req.files["productImg"]) {
      if (productData.productPhotos.productImg) {
        await deleteFile(productData.productPhotos.productImg);
      }
      const productImg = req.files["productImg"][0];
      const productImgData = await uploadImg(productImg);
      productImagesKeys.productImg = productImgData.Key;
      fs.unlinkSync(productImg.path);
    }
    if (req.files["leftImg"]) {
      if (productData.productPhotos.leftImg) {
        await deleteFile(productData.productPhotos.leftImg);
      }
      const leftImg = req.files["leftImg"][0];
      const leftImgData = await uploadImg(leftImg);
      productImagesKeys.leftImg = leftImgData.Key;
      fs.unlinkSync(leftImg.path);
    }
    if (req.files["rightImg"]) {
      if (productData.productPhotos.rightImg) {
        await deleteFile(productData.productPhotos.rightImg);
      }
      const rightImg = req.files["rightImg"][0];
      const rightImgData = await uploadImg(rightImg);
      productImagesKeys.rightImg = rightImgData.Key;
      fs.unlinkSync(rightImg.path);
    }
    if (req.files["frontImg"]) {
      if (productData.productPhotos.frontImg) {
        await deleteFile(productData.productPhotos.frontImg);
      }
      const frontImg = req.files["frontImg"][0];
      const frontImgData = await uploadImg(frontImg);
      productImagesKeys.frontImg = frontImgData.Key;
      fs.unlinkSync(frontImg.path);
    }
    if (req.files["backImg"]) {
      if (productData.productPhotos.leftImg) {
        await deleteFile(productData.productPhotos.leftImg);
      }
      const backImg = req.files["backImg"][0];
      const backImgData = await uploadImg(backImg);
      productImagesKeys.backImg = backImgData.Key;
      fs.unlinkSync(backImg.path);
    }
    productData.productPhotos = productImagesKeys;
    await productData.save();
    res.status(200).json({
      status: "success",
      message: "Product Successfully Created.",
      data: productData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndUpdate({ _id: id},{ adminVisibility: false } )
    // const productText = await Product.findById(id);
    // if (productText.productPhotos) {
    //   if (productText.productPhotos.thumbnailImg) {
    //     await deleteFile(productText.productPhotos.thumbnailImg);
    //   }
    //   if (productText.productPhotos.productImg) {
    //     await deleteFile(productText.productPhotos.productImg);
    //   }
    //   if (productText.productPhotos.leftImg) {
    //     await deleteFile(productText.productPhotos.leftImg);
    //   }
    //   if (productText.productPhotos.rightImg) {
    //     await deleteFile(productText.productPhotos.rightImg);
    //   }
    //   if (productText.productPhotos.frontImg) {
    //     await deleteFile(productText.productPhotos.frontImg);
    //   }
    //   if (productText.productPhotos.backImg) {
    //     await deleteFile(productText.productPhotos.backImg);
    //   }
    // }
    // await Product.findByIdAndDelete(id);
    res.status(200).json({
      statusbar: "success",
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
