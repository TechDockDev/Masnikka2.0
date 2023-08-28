import Cart from "@/models/user/cartModel";

export default async function handler(req, res) {
  const { action } = req.body;
  const { cartId } = req.query;
  const cart = await Cart.findById(cartId).populate("productSize");
  switch (action) {
    case "Add":
      if (cart.productSize.stock > cart.quantity) {
        cart.quantity = cart.quantity + 1;
        await cart.save();
        res.status(200).json({
          status: "success",
          message: "Quantity updated successfully",
        });
      } else {
        res.status(204).json({
          status: "success",
          message: "No stock ",
        });
      }
      break;
    case "Remove":
      if (cart.quantity === 1) {
        await Cart.findByIdAndDelete(cartId);
        res.status(200).json({
          status: "success",
          message: "deleted successfully",
        });
      } else {
        cart.quantity = cart.quantity - 1;
        await cart.save();
        res.status(200).json({
          status: "success",
          message: "Quantity updated Successfully",
        });
      }
      break;
    default:
      break;
  }
}
