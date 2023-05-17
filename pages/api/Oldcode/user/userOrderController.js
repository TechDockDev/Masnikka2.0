const Cart = require("../../models/user/cartModel");
const Address = require("../../models/user/userAddressModel");
const User = require("../../models/user/userModel");
const Order = require("./../../models/user/userOrder");
const Transaction = require("./../../models/user/transactionModel");
const Customize = require("../../models/user/customizeModel");
const Shipping = require("../../models/user/shippingModel");
const ProductSize = require("../../models/product/productSizeModel");
exports.createOrder = async (req, res) => {
  try {
    let totalPrice = 0;
    const data = [];
    const { addressId } = req.body;
    // console.log(req.body, req.user);
    const address = await Address.findById(addressId);
    const user = await User.findById(req.user._id);
    const cart = await Cart.find({ user: req.user._id })
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

    if (cart) {
      for (let index = 0; index < cart.length; index++) {
        const element = cart[index];
        //................................................................

        const dPrice = Math.trunc(
          (element.productSize.unitPrice *
            element.productSize.product.discountPercent) /
            100
        );
        const currentPrice =
          (element.productSize.unitPrice - dPrice) * element.quantity;
        console.log(currentPrice);
        totalPrice =
          totalPrice + currentPrice + element.productSize.product.shippingCost;

        //................................................................

        element.shippingAmount = element.productSize.product.shippingCost;
        element.amount = element.productSize.unitPrice - dPrice;
        if (element.customized) {
          console.log(element.productSize.customizePrice);
          element.price = element.price + element.productSize.customizePrice;
          totalPrice =
            totalPrice + element.productSize.customizePrice * element.quantity;
        }
        data.push(element);
      }
    } else {
      console.log("no cart data available");
    }

    const createTransaction = await Transaction.create({
      totalPrice: totalPrice,
      paymentStatus: "pending",
    });
    const transaction = await Transaction.findById(createTransaction._id);

    for (let index = 0; index < cart.length; index++) {
      const element = cart[index];
      // const custom = await Customize.findById(element.customize);
      // custom.order = true;
      // await custom.save();
      const shipping = await Shipping.create({ user: element.user });
      if (element.customized) {
        const custom = await Customize.findById(element.customize);
        custom.order = true;
        custom.orderCount = custom.orderCount + 1;
        await custom.save();
      }
      // transaction.
      const order = await Order.create({
        user: user._id,
        "address.name": address.name,
        "address.phoneNumber": address.phoneNumber,
        "address.houseNo": address.houseNo,
        "address.address": address.address,
        "address.city": address.city,
        "address.state": address.state,
        "address.country": address.country,
        "address.pinCode": address.pinCode,
        transactionId: transaction._id,
        customizedAmount: element.productSize.customizePrice,
        orderStatus: "created",
        shippingAmount: element.shippingAmount,
        amount: element.amount,
        shipping: shipping._id,
        paymentStatus: "pending",
        quantity: element.quantity,
        productSize: element.productSize._id,
        customized: element.customized,
        customize: element.customize,
      });
      transaction.order.push(order._id);
      await Shipping.findByIdAndUpdate(shipping._id, {
        order: order._id,
      });
    }
    await transaction.save();

    res.status(200).json({
      status: "success",
      message: "Order created successfully",
      transaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.updateSuccessPayment = async (req, res) => {
  try {
    const transactionId = req.params.transactionId;
    const transaction = await Transaction.findById(transactionId);
    transaction.paymentStatus = "paid";
    const cart = await Cart.find({ user: req.user._id }).populate(
      "productSize"
    );

    for (let index = 0; index < cart.length; index++) {
      const element = cart[index];
      const productSizeId = await ProductSize.findById(element.productSize._id);
      productSizeId.stock = productSizeId.stock - element.quantity;
      await productSizeId.save();
    }
    const order = await Order.updateMany(
      { transactionId: transaction._id },
      {
        paymentStatus: "paid",
      }
    );
    await transaction.save();
    await Cart.deleteMany({
      user: req.user._id,
    });
    res.status(200).json({ status: "success", message: "success" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.updateFailedPayment = async (req, res) => {
  try {
    const transactionId = req.params.transactionId;
    const transaction = await Transaction.findById(transactionId);
    transaction.paymentStatus = "failed";
    const order = await Order.updateMany(
      { transactionId: transaction._id },
      {
        paymentStatus: "failed",
      }
    );
    await transaction.save();

    res.status(200).json({ status: "success", message: "success", orderId });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.myOrder = async (req, res) => {
  try {
    const myOrder = await Order.find({
      user: req.user._id,
    })
      .populate("rating")
      .populate("transactionId")
      .sort({ _id: -1 })
      .populate("shipping")
      .populate({
        path: "productSize",
        populate: { path: "product" },
        // populate: { path: "productColor" },
      })
      .populate({
        path: "productSize",
        // populate: { path: "product" },
        populate: { path: "productColor" },
      });
    res.status(200).json({
      status: "success",
      message: "successfully",
      myOrder,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.mySingleOrder = async (req, res) => {
  try {
    const myOrder = await Order.findById(req.params.orderId)
      .populate("transactionId")
      .populate("shipping")
      .populate("rating")
      .populate({
        path: "productSize",
        populate: {
          path: "product",
          populate: { path: "categoryId" },
        },
        // populate: { path: "productColor" },
      })
      .populate({
        path: "productSize",
        populate: {
          path: "product",
          populate: { path: "brandId" },
        },
        // populate: { path: "productColor" },
      })
      .populate({
        path: "productSize",
        // populate: { path: "product" },
        populate: { path: "productColor" },
      });
    res.status(200).json({
      status: "success",
      message: "successfully",
      myOrder,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    const productSize = await ProductSize.findById(order.productSize);
    productSize.stock = productSize.stock + 1;

    order.orderStatus = "cancelled";

    await productSize.save();
    await order.save();
    res.status(200).json({
      status: "success",
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
