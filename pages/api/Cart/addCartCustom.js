import getUser from "@/lib/getUser";
import productSizeModel from "@/models/product/productSizeModel";
import Cart from "@/models/user/cartModel";

export default async function handler(req, res) {
  try {
    req.user = await getUser(req.headers.id);
    switch (req.method) {
      case "POST":
        const { productSizeId, quantity, customizeId } = req.body;
        console.log(customizeId);
        const productSize = await productSizeModel
          .findById(productSizeId)
          .populate("product");
        const price = Math.trunc(
          (productSize.unitPrice *
            (100 - productSize.product.discountPercent)) /
            100
        );
        const cartData = await Cart.findOne({
          user: req.headers.id,
          productSize: productSizeId,
          customize: customizeId,
        });
        if (cartData) {
          cartData.quantity = cartData.quantity + 1;
          await cartData.save();
          res.status(200).json({
            status: "success",
            message: "Product added to cart",
            cart: cartData,
          });
        } else {
          const cart = await Cart.create({
            productSize: productSizeId,
            customize: customizeId,
            quantity,
            customized: true,
            user: req.headers.id,
          });
          res.status(200).json({
            status: "success",
            message: "Product added to cart",
            cart,
          });
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
