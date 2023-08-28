import User from "@/models/user/userModel";
const bcrypt = require("bcrypt");

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "PATCH":
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = await User.findByIdAndUpdate(req.headers.id, {
          password: hash,
        });
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
