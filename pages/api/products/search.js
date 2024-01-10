import getUser from "@/lib/getUser";
import productModel from "@/models/product/productModel";

export default async function handler(req, res) {
  try {
    req.user = await getUser(req.headers.id);
    switch (req.method) {
      case "GET":
        const { query } = req.query;
        const products = await productModel
          .find({
            name: { Rregex: query, Roptions: "i" },
          })
          .populate("productColor");
        res.json({
          success: true,
          message: "Products have been fetched",
          products,
        });
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
