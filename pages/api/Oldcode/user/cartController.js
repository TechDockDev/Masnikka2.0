const Cart = require("./../../models/user/cartModel");
const ProductSize = require("./../../models/product/productSizeModel");
exports.addProductToCart = async (req, res) => {
  try {
    const { productSizeId, quantity } = req.body;
    const productSize = await ProductSize.findById(productSizeId).populate(
      "product"
    );
    const price = Math.trunc(
      (productSize.unitPrice * (100 - productSize.product.discountPercent)) /
        100
    );
    const cartData = await Cart.findOne({
      user: req.user._id,
      productSize: productSizeId,
    });
    if (cartData) {
      cartData.quantity = cartData.quantity + 1;
      await cartData.save();
      res.status(200).json({
        status: "success",
        message: "product added to cart",
        cart: cartData,
      });
    } else {
      const cart = await Cart.create({
        productSize: productSizeId,
        quantity,
        user: req.user._id,
      });
      res.status(200).json({
        status: "success",
        message: "product added to cart",
        cart,
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.addProductToCartCustom = async (req, res) => {
  try {
    const { productSizeId, quantity, customizeId } = req.body;
    const productSize = await ProductSize.findById(productSizeId).populate(
      "product"
    );
    const price = Math.trunc(
      (productSize.unitPrice * (100 - productSize.product.discountPercent)) /
        100
    );
    const cartData = await Cart.findOne({
      user: req.user._id,
      productSize: productSizeId,
      customize: customizeId,
    });
    if (cartData) {
      cartData.quantity = cartData.quantity + 1;
      await cartData.save();
      res.status(200).json({
        status: "success",
        message: "product added to cart",
        cart: cartData,
      });
    } else {
      const cart = await Cart.create({
        productSize: productSizeId,
        customize: customizeId,
        quantity,
        customized: true,
        user: req.user._id,
      });
      res.status(200).json({
        status: "success",
        message: "product added to cart",
        cart,
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.myCart = async (req, res) => {
  try {
    const myCart = await Cart.find({ user: req.user._id })
      .sort({ _id: -1 })
      .populate({
        path: "productSize",
        populate: { path: "productColor" },
      })
      .populate({
        path: "productSize",
        populate: { path: "product" },
      })
      .populate({
        path: "customize",
      })

      .exec();

    let totalPrice = 0;
    let shippingPrice = 0;
    let totalProductPrice = 0;
    let totalDiscount = 0;
    let totalCustomizedPrice = 0;
    const data = [];

    if (myCart) {
      for (let index = 0; index < myCart.length; index++) {
        const element = myCart[index];
        shippingPrice =
          shippingPrice + element.productSize.product.shippingCost;
        totalProductPrice =
          (totalProductPrice + element.productSize.unitPrice) *
          element.quantity;

        const dPrice = Math.trunc(
          (element.productSize.unitPrice *
            element.productSize.product.discountPercent) /
            100
        );
        totalDiscount = totalDiscount + dPrice * element.quantity;
        const currentPrice =
          (element.productSize.unitPrice - dPrice) * element.quantity;
        console.log(currentPrice);
        totalPrice =
          totalPrice + currentPrice + element.productSize.product.shippingCost;

        element.price = Math.trunc(
          (element.productSize.unitPrice *
            (100 - element.productSize.product.discountPercent)) /
            100
        );
        if (element.customized) {
          totalCustomizedPrice =
            totalCustomizedPrice + element.productSize.customizePrice;
          console.log(element.productSize.customizePrice);
          element.price = element.price + element.productSize.customizePrice;
          totalPrice =
            totalPrice + element.productSize.customizePrice * element.quantity;
        }
        data.push(element);
      }
    }

    // console.log(typeof myCart[0].price);
    res.status(200).json({
      status: "success",
      message: "success",
      totalPrice,
      totalDiscount,
      shippingPrice,
      totalProductPrice,
      totalCustomizedPrice,
      data: myCart,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.addProductQuantityToCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await Cart.findById(cartId).populate("productSize");
    console.log(cart);
    if (cart.productSize.stock > cart.quantity) {
      cart.quantity = cart.quantity + 1;
      await cart.save();
      res.status(200).json({
        status: "success",
        message: "success",
      });
    } else {
      res.status(204).json({
        status: "noStock",
        message: "no sock ",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.addProductRemoveToCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await Cart.findById(cartId).populate("productSize");
    if (cart.quantity === 1) {
      await Cart.findByIdAndDelete(cartId);
      res.status(200).json({
        status: "success",
        message: "deleted successfully ",
      });
    } else {
      cart.quantity = cart.quantity - 1;
      await cart.save();
      res.status(200).json({
        status: "success",
        message: "success  . ",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
