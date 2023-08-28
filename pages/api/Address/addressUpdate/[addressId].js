import getUser from "@/lib/getUser";
import productModel from "@/models/product/productModel";
import User from "@/models/user/userModel";
import Address from "@/models/user/userAddressModel";
import dbConnect from "@/lib/dbConnect";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const { addressId } = req.query;
    switch (req.method) {
      case "PATCH":
        const {
          name,
          address,
          phoneNumber,
          city,
          state,
          country,
          pinCode,
          defaultAddress,
        } = req.body;
        const addressText = await Address.findByIdAndUpdate(
          { _id: addressId },
          {
            name,
            phoneNumber,
            address,
            city,
            state,
            country,
            pinCode,
            defaultAddress,
          },
          {
            new: true,
          }
        );
        res.status(200).json({
          status: "success",
          message: "Address Updated successfully",
          data: addressText,
        });
        break;
      case "DELETE":
        await Address.findByIdAndDelete(addressId);
        const userDocument = await User.findById(req.headers.id);
        const filteredArray = userDocument.address.filter(
          (e) => e.toString() !== addressId
        );
        userDocument.address = filteredArray;
        await userDocument.save();
        res.status(200).json({
          status: "success",
          message: "Address Deleted successfully",
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
