import Otp from "@/models/user/otpModel";
import User from "@/models/user/userModel";
const bcrypt = require("bcrypt");

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "PATCH":
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const otp = await Otp.findOne({ user: user._id });
        if (!otp?.verified) {
          res.status(400).json({
            status: "error",
            message: "Otp isn't verified",
          });
        }
        const hash = await bcrypt.hash(password, 10);
        user.password = hash;
        await user.save();
        res.json({
          success: true,
          message: "Password has been updated successfully",
          user,
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
