import getUser from "@/lib/getUser";
import productModel from "@/models/product/productModel";
import User from "@/models/user/userModel";
import Address from "@/models/user/userAddressModel";
import dbConnect from "@/lib/dbConnect";

export default async function handler(req, res) {
  try {
    await dbConnect();
    switch (req.method) {
      case "GET":
        const address = await Address.findOne({
          user: req.headers.id,
          defaultAddress: true,
        });
        res.json({
          status: "success",
          message: "address has been fetched successfully",
          address,
        });
        break;
      case "PATCH":
        await Address.updateMany(
          { user: req.headers.id },
          {
            defaultAddress: false,
          }
        );
        await Address.findByIdAndUpdate(req.query.addressId, {
          defaultAddress: true,
        });
        res.status(200).json({
          status: "success",
          message: "Address has been sen default succussfully",
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
