import sendEmail from "@/lib/sendEmail";
import Otp from "@/models/user/otpModel";
import User from "@/models/user/userModel";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST":
        try {
          const { email, code } = req.body;
          const user = await User.findOne({ email });
          const otp = await Otp.findOne({ user: user._id });
          if (!otp) {
            return res.status(404).json({ message: "Otp doesn't exist" });
          }
          if (otp.code !== Number(code)) {
            res.status(401).json({
              status: "error",
              message: "Otp is Invalid",
            });
          }
          otp.verified = true;
          await otp.save();
          res.status(200).json({
            status: "success",
            message: "Otp verified Successfully",
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({
            status: "error",
            message: "Internal server error",
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
