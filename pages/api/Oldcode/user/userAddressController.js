const User = require("../../models/user/userModel");
const Address = require("../../models/user/userAddressModel");

exports.getAllAddressOfUser = async (req, res) => {
  try {
    const { userId, getDefault } = req.body;
    let addressList;
    if (getDefault) {
      addressList = await Address.find({ user: userId, defaultAddress: true });
    } else {
      addressList = await Address.find({ user: userId });
    }
    console.log(addressList);
    res.status(200).json({
      status: "success",
      message: "User Address List Fetched",
      data: addressList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.createAddressAndUpdateUser = async (req, res) => {
  try {
    const {
      userId,
      name,
      houseNo,
      address,
      phoneNumber,
      city,
      state,
      country,
      pinCode,
      defaultAddress,
    } = req.body;
    const addressText = await Address.create({
      user: userId,
      name,
      phoneNumber,
      houseNo,
      address,
      city,
      state,
      country,
      pinCode,
      defaultAddress,
    });
    const userText = await User.findById(userId);
    userText.address.push(addressText._id);
    // userText.location = "Point";
    await userText.save();
    res.status(200).json({
      status: "success",
      message: "Address Added successfully",
      data: addressText,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.updateAddressAndUpdateUser = async (req, res) => {
  try {
    const {
      addressId,
      userId,
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
        houseNo,
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.deleteAddressAndUpdateUser = async (req, res) => {
  try {
    const { addressId } = req.body;
    const addressText = Address.findById(addressId);
    const userText = await User.findById(addressText.user);
    const userAddress = userText.address;
    const filteredArray = arr.filter((e) => e !== addressId);
    console.log(filteredArray);
    // const newAddressList = await Address.findByIdAndDelete(addressId);

    res.status(200).json({
      status: "success",
      message: "Address Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// harsh
exports.createAddress = async (req, res) => {
  try {
    const {
      name,
      houseNo,
      address,
      phoneNumber,
      city,
      state,
      country,
      pinCode,
      defaultAddress,
    } = req.body;
    console.log("aaaaaaa", defaultAddress);
    if (defaultAddress) {
      await Address.updateMany(
        { user: req.user._id },
        {
          defaultAddress: false,
        }
      );
    }
    const checkAddress = await Address.find({ user: req.user._id });
    let defaultAddressStatus = defaultAddress;
    if (checkAddress.length === 0) {
      defaultAddressStatus = true;
    }
    const addressText = await Address.create({
      user: req.user._id,
      name,
      phoneNumber,
      houseNo,
      address,
      city,
      state,
      country,
      pinCode,
      defaultAddress: defaultAddressStatus,
    });

    res.status(200).json({
      status: "success",
      message: "Address Added successfully",
      data: addressText,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.getAllAddress = async (req, res) => {
  try {
    const address = await Address.find({ user: req.user._id }).sort({
      _id: -1,
    });
    res.status(200).json({
      status: "success",
      message: "successfully",
      address,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.setDefaultAddress = async (req, res) => {
  try {
    await Address.updateMany(
      { user: req.user._id },
      {
        defaultAddress: false,
      }
    );
    const address = await Address.findByIdAndUpdate(req.params.addressId, {
      defaultAddress: true,
    });
    res.status(200).json({
      status: "success",
      message: "successfully",
      address,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.addressId);

    res.status(200).json({
      status: "success",
      message: "deleted successfully ",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const {
      name,
      houseNo,
      address,
      phoneNumber,
      city,
      state,
      country,
      pinCode,
      defaultAddress,
    } = req.body;
    if (defaultAddress) {
      await Address.updateMany(
        { user: req.user._id },
        {
          defaultAddress: false,
        }
      );
    }
    const addressText = await Address.findByIdAndUpdate(req.params.addressId, {
      user: req.user._id,
      name,
      phoneNumber,
      houseNo,
      address,
      city,
      state,
      country,
      pinCode,
      defaultAddress,
    });

    res.status(200).json({
      status: "success",
      message: "Address updated successfully",
      data: addressText,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.getDefaultAddress = async (req, res) => {
  try {
    const address = await Address.findOne({
      user: req.user._id,
      defaultAddress: true,
    });
    res.status(200).json({
      status: "success",
      message: "successfully",
      address,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.getSingleAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.addressId);
    res.status(200).json({
      status: "success",
      message: "successfully",
      address,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
