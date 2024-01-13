import sendEmail from "@/lib/sendEmail";
import Otp from "@/models/user/otpModel";
import User from "@/models/user/userModel";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST":
        try {
          // Find user with given email
          const user = await User.findOne({ email: req.body.email });
          if (!user) {
            return res.status(404).json({ message: "User doesn't exist" });
          }
          // Generate otp
          const otp = Math.floor(100000 + Math.random() * 900000);
          const message = `${otp} is the verification code for changing your password.`;
          await sendEmail({
            email: user.email,
            subject: "Your password reset token (valid for 10 min)",
            message,
          });

          await Otp.create({
            user: user._id,
            code: otp,
          });

          res.status(200).json({
            status: "success",
            message: "Token sent to email",
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
