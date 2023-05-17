const User = require("../../models/user/userModel");
const Support = require("../../models/user/userSupportModel");

exports.getUserSupportPage = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const usersSupportList = await Support.find({})
      .populate("user")
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      status: "success",
      message: "User Support Successfully Fetched",
      data: usersSupportList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

exports.getUserSupportData = async (req, res) => {
  try {
    const data = await Support.find({ user: req.user._id }).sort({ _id: -1 });

    res.status(200).json({
      status: "success",
      message: "User Support Successfully Fetched",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

exports.createUserSupportQuery = async (req, res) => {
  try {
    const { subject, query } = req.body;
    const usersSupport = await Support.create({
      user: req.user._id,
      subject,
      query,
    });
    res.status(201).json({
      status: "success",
      message: "Support query Successfully Created",
      data: usersSupport,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

exports.adminReply = async (req, res) => {
  try {
    const { id, reply } = req.body;
    console.log(reply);
    const supportText = await Support.findByIdAndUpdate(
      { _id: id },
      { reply: reply, replayedByAdmin: true },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "Reply Updated successfully",
      data: supportText,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};
