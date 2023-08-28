import getUser from "@/lib/getUser";
import Cart from "@/models/user/cartModel";

export default async function handler(req, res) {
  try {
    req.user = await getUser(req.headers.id);
    switch (req.method) {
      case "GET":
        break;
      case "POST":
        break;
      case "DELETE":
        const { cartId } = req.query;
        await Cart.findByIdAndDelete(cartId);
        res.status(200).json({
          status: "success",
          message: "deleted successfully ",
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
