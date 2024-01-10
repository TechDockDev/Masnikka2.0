import dbConnect from "@/lib/dbConnect";
import User from "@/models/user/userModel";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import cookie from "cookie";

// Generating token with user ID
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
// controller for sending creating token for future authorization
const createSendToken = (user, res) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("bearerToken", token, cookieOptions)
  );

  res.status(200).json({
    status: "success",
    message: "Login Successfully",
    data: {
      user,
      token,
    },
  });
};
export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      let user = await User.findOne({
        Ror: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }],
      });

      if (!user) {
        const hash = await bcrypt.hash(req.body.password, 10);
        user = await User.create({ ...req.body, password: hash });
        createSendToken(user, res);
      } else {
        res.status(409).json({
          status: "conflict",
          message: "User already exist",
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  } else {
    res.status(400).json({
      message: error.message,
    });
  }
}
