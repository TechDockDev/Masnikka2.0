const Attribute = require("../../models/product/attributesModel");

exports.attributeList = async (req, res) => {
  try {
    const attributeList = await Attribute.find({}).select("name");
    res.status(200).json({
      status: "success",
      message: "Available Attribute List",
      data: attributeList,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
exports.createAttribute = async (req, res) => {
  try {
    const { name } = req.body;
    const attributeCheck = await Attribute.findOne({ name: name });
    if (!attributeCheck) {
      const AttributeText = await Attribute.create({ name });
      res.status(201).json({
        status: "success",
        message: "Attribute Created Successfully",
        data: AttributeText,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Attribute Already Exists",
        data: attributeCheck,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      errors: error,
    });
  }
};
exports.updateAttribute = async (req, res) => {
  try {
    const { id, name } = req.body;
    const attributeCheck = await Attribute.findOne({ name: name });
    // console.log(attributeCheck)
    if (attributeCheck) {
      res.status(203).json({
        status: "success",
        message: "Attribute Already Exists",
        data: attributeCheck,
      });
    } else {
      const attributeText = await Attribute.findByIdAndUpdate(
        { _id: id },
        { name },
        { new: true }
      );
      res.status(200).json({
        status: "success",
        message: "Attribute Updated Successfully",
        data: attributeText,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      errors: error,
    });
  }
};
exports.deleteAttribute = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(204).json({
        status: "Error",
        message: "Plz Provide Attribute Id is required",
      });
    } else {
      await Attribute.findByIdAndDelete(id);
      res.status(202).json({
        status: "success",
        message: "Attribute Deleted Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      errors: error,
    });
  }
};
