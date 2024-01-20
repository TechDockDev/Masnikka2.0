import getUser from "@/lib/getUser";
import productSizeModel from "@/models/product/productSizeModel";
import Cart from "@/models/user/cartModel";

export default async function handler(req, res) {
  try {
    req.user = await getUser(req.headers.id);
    switch (req.method) {
      case "GET":
        const myCart = await Cart.find({ user: req.user._id })
          .sort({ _id: -1 })
          .populate({
            path: "productSize",
            populate: { path: "productColor" },
          })
          .populate({
            path: "productSize",
            populate: {
              path: "product",
              populate: { path: "brandId", select: "name" },
            },
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
              totalProductPrice +
              element.productSize.unitPrice * element.quantity;
            const dPrice = Math.trunc(
              (element.productSize.unitPrice *
                element.productSize.product.discountPercent) /
                100
            );
            totalDiscount = totalDiscount + dPrice * element.quantity;
            const currentPrice =
              (element.productSize.unitPrice - dPrice) * element.quantity;
            totalPrice =
              totalPrice +
              currentPrice +
              element.productSize.product.shippingCost;

            element.price = Math.trunc(
              (element.productSize.unitPrice *
                (100 - element.productSize.product.discountPercent)) /
                100
            );
            if (element.customized) {
              totalCustomizedPrice =
                totalCustomizedPrice +
                element.productSize.customizePrice *
                  element.customize.designCount;
              element.price =
                element.price + element.productSize.customizePrice;
              totalPrice =
                totalPrice +
                element.productSize.customizePrice * element.quantity;
            }
            data.push(element);
          }
        }

        res.status(200).json({
          status: "success",
          message: "success",
          totalPrice,
          totalDiscount,
          shippingPrice,
          totalProductPrice,
          totalCustomizedPrice,
          products: myCart,
        });
        break;
      case "POST":
        const { productSizeId, quantity } = req.body;
        const productSize = await productSizeModel
          .findById(productSizeId)
          .populate("product");
        const price = Math.trunc(
          (productSize.unitPrice *
            (100 - productSize.product.discountPercent)) /
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
