const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const AttributesSchema = new Schema({
  name: {
    type: String,
  },
});

const Attribute = mongoose.model("Attribute", AttributesSchema);

module.exports = Attribute;
