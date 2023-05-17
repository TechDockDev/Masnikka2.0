require("dotenv").config();
const User = require("../../models/user/userModel");
const jwt = require("jsonwebtoken");
const {
  verifyFirebaseToken,
  sendNotification,
  getUserData,
} = require("./firebase");
const { uploadImg, getFileStream } = require("../../config/s3config");

// sendNotification(
//   "mgsTitle",
//   "mgsBody",
//   "cR6Uf-g1R2q-jptmhCE0WQ:APA91bEfpN14LSidtafh2JHE4cUf2RNqivftBkXeCA3Ekzu9xD5_rKbTNF3remCT9EyZFXysy18vKpjq7s6D8FhpzpaBwwkeOWKGvI5rhPX5dVdtg76qaqZxkZBLBec3qaFs02DGgk_7",
//   {}
// );
exports.loginWithGoogle = async (req, res) => {
  try {
    const {
      authToken,
      notificationToken,
      email,
      facebookUid,
      appleUid,
      googleUid,
    } = req.body;
    const tokenValue = await verifyFirebaseToken(authToken);
    console.log(req.body);
    if (tokenValue.message) {
      res
        .status(401)
        .json({ status: "unauthorized", message: tokenValue.message });
    } else {
      if (tokenValue.firebase.sign_in_provider === "facebook.com") {
        console.log("facebook");
        const user = await User.findOne({ facebookUid: tokenValue.uid });
        if (user) {
          const token = await createSendToken(user);
          user.password = undefined;
          if (notificationToken) {
            user.notificationToken = notificationToken;
            await user.save();
          } else {
          }
          if (email) {
            user.email = email;
            await user.save();
          } else {
          }
          if (facebookUid) {
            user.facebookUid = facebookUid;
            await user.save();
          } else {
          }
          res
            .status(200)
            .json({ status: "success", message: "successFully", user, token });
        } else {
          res.status(404).json({
            status: "not found",
            message: "user not found Kindly create user",
          });
        }
      } else if (tokenValue.firebase.sign_in_provider === "google.com") {
        console.log("email", tokenValue.firebase.identities);
        let userData = await getUserData(tokenValue.uid);
        console.log("aaa", userData.uid);
        let email = userData.providerData[0].email;
        const user = await User.findOne({ googleUid: userData.uid });
        if (user) {
          const token = await createSendToken(user);

          user.password = undefined;
          if (notificationToken) {
            user.notificationToken = notificationToken;
            await user.save();
          } else {
          }
          if (email) {
            user.email = email;
            await user.save();
          } else {
          }
          if (googleUid) {
            user.googleUid = googleUid;
            await user.save();
          } else {
          }
          if (facebookUid) {
            user.facebookUid = facebookUid;
            await user.save();
          } else {
          }
          res
            .status(200)
            .json({ status: "success", message: "successFully", user, token });
        } else {
          res.status(404).json({
            status: "not found",
            message: "user not found Kindly create user",
          });
        }
      } else if (tokenValue.firebase.sign_in_provider === "phone") {
        console.log(tokenValue.phone_number);
        console.log("tokenValue phone", googleUid);
        const user = await User.findOne({
          phoneNumber: tokenValue.phone_number,
        });
        if (user) {
          const token = await createSendToken(user);

          user.password = undefined;
          if (notificationToken) {
            user.notificationToken = notificationToken;
            await user.save();
          } else {
          }
          if (email) {
            user.email = email;
            await user.save();
          } else {
          }
          if (googleUid) {
            user.googleUid = googleUid;
            await user.save();
          } else {
          }
          if (facebookUid) {
            user.facebookUid = facebookUid;
          } else {
          }

          if (appleUid) {
            user.appleUid = appleUid;
          } else {
          }
          res
            .status(200)
            .json({ status: "success", message: "successFully", user, token });
        } else {
          res.status(404).json({
            status: "not found",
            message: "user not found Kindly create user",
          });
        }
      } else if (tokenValue.firebase.sign_in_provider === "apple.com") {
        console.log(tokenValue.uid);
        console.log("tokenValue");
        const user = await User.findOne({
          appleUid: tokenValue.uid,
        });
        if (user) {
          const token = await createSendToken(user);

          user.password = undefined;
          if (notificationToken) {
            user.notificationToken = notificationToken;
            await user.save();
          } else {
          }
          if (email) {
            user.email = email;
            await user.save();
          } else {
          }
          if (appleUid) {
            user.appleUid = appleUid;
          } else {
          }
          res.status(200).json({
            status: "success",
            message: "successFully",
            user,
            token,
          });
        } else {
          res.status(404).json({
            status: "not found",
            message: "user not found Kindly create user",
          });
        }
      } else {
        res.status(409).json({ status: "error", message: "invalid Token " });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.errorInfo });
  }
};

exports.signupWithGoogle = async (req, res) => {
  try {
    console.log(req.body);
    const {
      authToken,
      appleUid,
      userName,
      notificationToken,
      email,
      googleUid,
      facebookUid,
    } = req.body;

    console.log(req.body);
    const latitude = req.body.latitude * 1;
    const longitude = req.body.longitude * 1;

    const tokenValue = await verifyFirebaseToken(authToken);
    console.log(tokenValue);
    if (tokenValue.message) {
      res
        .status(401)
        .json({ status: "unauthorized", message: tokenValue.message });
    } else {
      if (tokenValue.firebase.sign_in_provider === "facebook.com") {
        res.status(401).json({
          status: "unauthorized",
          message: "kindly send Phone token",
        });
      } else if (tokenValue.firebase.sign_in_provider === "google.com") {
        console.log(tokenValue.email);
        const user = await User.findOne({ email: tokenValue.email });
        res.status(401).json({
          status: "unauthorized",
          message: "kindly send Phone token",
        });
      } else if (tokenValue.firebase.sign_in_provider === "apple.com") {
        console.log(tokenValue.uid);
        const user = await User.findOne({ appleUid: tokenValue.uid });
        res.status(401).json({
          status: "unauthorized",
          message: "kindly send Phone token",
        });
      } else if (tokenValue.firebase.sign_in_provider === "phone") {
        const user = await User.findOne({
          phoneNumber: tokenValue.phone_number,
        });
        console.log("user", user);
        if (user) {
          user.password = undefined;
          const token = createSendToken(user);
          res
            .status(200)
            .json({ status: "success", message: "successFully", user, token });
        } else {
          //create user hear
          const newUser = await User.create({
            location: { type: "Point", coordinates: [longitude, latitude] },
            userName,
            appleUid,
            facebookUid,
            googleUid,
            phoneNumber: tokenValue.phone_number,
            email,
            notificationToken,
          });
          const token = createSendToken(newUser);

          res.status(201).json({
            status: "Created",
            message: "User create successfully",
            user: newUser,
            token,
          });
        }
      } else {
        res.status(500).json({ status: "error", message: "invalid Token " });
      }
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user) => {
  return (token = signToken(user._id));
};

exports.dashboard = async (req, res) => {
  try {
    const user = await req.user;
    // console.log(user);
    res.status(200).json({ status: "success", message: "Successfully", user });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.protect = async (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    let token;
    console.log("token");

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      if (!token) {
        res.status(401).json({
          status: "unauthorized",
          message: "you are not logged in ! please log in to get access",
        });
      } else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);

        currentUser = await User.findById(decoded.id);
        if (!currentUser) {
          res.status(404).json({
            status: "not found",
            message: "User not found",
          });
        } else {
          req.user = currentUser;

          next();
        }
      }
    } else {
      res.status(404).json({
        status: "invalid token",
        message: "Invalid token",
      });
    }
    console.log("hello form auth");
  } catch (error) {
    // console.log(error);
    res.status(401).json({
      status: "unauthorized",
      message: "you are not logged in ! please log in to get error access",
    });
  }
};

exports.addFacebookUid = async (req, res) => {
  try {
    const { facebookUid, userId } = req.body;
    const user = await User.findByIdAndUpdate(userId, { facebookUid });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.errorInfo });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const users = await User.find({}).sort({ _id: -1 }).skip(skip).limit(limit);
    const totalUser = await User.count({});
    res.status(200).json({
      totalUser,
      message: "User List Created",
      status: "Success",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;
    const newUser = await User.create({
      userName: name,
      email: email,
      phoneNumber: phoneNumber,
    });
    res
      .status(200)
      .json({ message: "New User Created", status: "Success", data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    const { id } = req.body;
    const userText = await User.findById(id)
      .populate("address")
      .populate({
        path: "orders",
        populate: {
          path: "productList",
          populate: {
            path: "attribute",
          },
          populate: {
            path: "product",
          },
        },
      });
    // .populate("reviews")
    // .populate("myDesigns")
    console.log(userText);
    res.status(200).json({
      status: "success",
      message: "User Details",
      data: userText,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.uploadAndChangeProfilePhoto = async (req, res) => {
  try {
    console.log(req.file);
    const result = await uploadImg(req.file);
    const user = await User.findById(req.user._id);
    user.profilePhoto = result.Key;
    await user.save();
    res
      .status(200)
      .json({ message: "User List Created", status: "Success", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.checkVersion = async (req, res) => {
  try {
    res.status(200).json({ status: "success", message: "success", version: 1 });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
