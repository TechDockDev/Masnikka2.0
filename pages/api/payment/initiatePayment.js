import productSizeModel from "@/models/product/productSizeModel";
import Cart from "@/models/user/cartModel";
import Transaction from "@/models/user/transactionModel";
import Order from "@/models/user/userOrder";
import crypto from "crypto";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        res.json({
          status: "success",
        });
        break;
      case "POST":
        try {
          const transactionId = req.params.transactionId;
          const transaction = await Transaction.findById(transactionId);
          transaction.paymentStatus = "paid";
          const cart = await Cart.find({ user: req.user._id }).populate(
            "productSize"
          );

          for (let index = 0; index < cart.length; index++) {
            const element = cart[index];
            const productSizeId = await productSizeModel.findById(
              element.productSize._id
            );
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
          res.status(200).json({
            status: "success",
            message: "Payment has been done successfully",
          });
        } catch (error) {
          res.status(500).json({ status: "error", message: error.message });
        }
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
