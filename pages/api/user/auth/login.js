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
    // sameSite: "lax",
    httpOnly: true,
    path: "/",
  };
  // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  cookieOptions.secure = false;
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
  if (req.method == "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST");
    return res.status(202).json({});
  }
  if (req.method === "POST") {
    try {
      if (req.body.loginType === "google") {
        // import auth from "./firebase-config";
        const auth = require("./firebase-config");
        const { email } = await auth.verifyIdToken(req.body.idToken);
        let user = await User.findOne({ email });
        if (user) {
          return createSendToken(user, res);
        }
      }
      const { email, password } = req.body;

      let user = await User.findOne({ email }).select("+password");
      if (user) {
        const checkPassword = await bcrypt.compare(password, user.password);
        if (checkPassword) {
          createSendToken(user, res);
        } else {
          res
            .status(400)
            .json({ status: "error", message: "Credentials are incorrect" });
        }
      } else {
        res.status(404).json({ status: "error", message: "User not found" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  } else {
    res.status(400).json({
      message: "wrong method",
    });
  }
}
