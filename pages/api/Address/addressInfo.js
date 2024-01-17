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
        const userDoc = await User.findById(req.headers.id).populate("address");
        res.json({
          status: "success",
          message: "address has been fetched successfully",
          user: userDoc,
        });
        break;
      case "POST":
        const {
          name,
          houseNo,
          address,
          phoneNumber,
          city,
          state,
          country,
          pinCode,
        } = req.body;
        let { defaultAddress } = req.body;
        const user = await User.findById(req.headers.id);
        if (user.address.length === 0) {
          defaultAddress = true;
        }
        const addressDoc = await Address.create({
          name,
          houseNo,
          address,
          phoneNumber,
          city,
          state,
          country,
          pinCode,
          defaultAddress,
          user: req.headers.id,
        });
        user.address.push(addressDoc._id);
        await user.save();
        res.status(200).json({
          status: "success",
          message: "Address Added successfully",
          data: addressDoc,
        });

        break;
      case "DELETE":
        const { addressId } = req.body;
        await Address.findByIdAndDelete(addressId);
        const userDocument = await User.findById(req.headers.id);
        const filteredArray = arr.filter((e) => e !== addressId);
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
