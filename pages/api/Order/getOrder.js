import dbConnect from "@/lib/dbConnect";
import getUser from "@/lib/getUser";
import productColorModel from "@/models/product/productColorModel";
import productSizeModel from "@/models/product/productSizeModel";
import Cart from "@/models/user/cartModel";
import Customize from "@/models/user/customizeModel";
import Rating from "@/models/user/ratingModel";
import Shipping from "@/models/user/shippingModel";
import Transaction from "@/models/user/transactionModel";
import Address from "@/models/user/userAddressModel";
import User from "@/models/user/userModel";
import Order from "@/models/user/userOrder";

export default async function handler(req, res) {
  try {
    req.user = await getUser(req.headers.id);
    await dbConnect();
    switch (req.method) {
      case "GET":
        const orders = await Order.find({
          user: req.headers.id,
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
          message: "Orders have been fetched successfully",
          orders,
        });
        break;
      case "POST":
        let totalPrice = 0;
        const data = [];
        const { addressId } = req.body;
        const address = await Address.findById(addressId);
        const user = await User.findById(req.headers.id);
        const cart = await Cart.find({ user: req.headers.id })
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
            totalPrice =
              totalPrice +
              currentPrice +
              element.productSize.product.shippingCost;

            //................................................................

            element.shippingAmount = element.productSize.product.shippingCost;
            element.amount = element.productSize.unitPrice - dPrice;
            if (element.customized) {
              console.log(element.productSize.customizePrice);
              element.price =
                element.price + element.productSize.customizePrice;
              totalPrice =
                totalPrice +
                element.productSize.customizePrice * element.quantity;
            }
            data.push(element);
          }
        } else {
          console.log("No cart data available");
        }

        const createTransaction = await Transaction.create({
          totalPrice: totalPrice,
          paymentStatus: "pending",
        });
        const transaction = await Transaction.findById(createTransaction._id);
        for (let index = 0; index < cart.length; index++) {
          const element = cart[index];
          const shipping = await Shipping.create({ user: element.user });
          if (element.customized) {
            const custom = await Customize.findById(element.customize);
            custom.order = true;
            custom.orderCount = custom.orderCount + 1;
            await custom.save();
          }
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
