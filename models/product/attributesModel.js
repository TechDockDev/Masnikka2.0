const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const AttributesSchema = new Schema({
  name: {
    type: String,
  },
});

module.exports =  mongoose.model.Attribute|| mongoose.model("Attribute", AttributesSchema);


