const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const User = require("./userModel");

const supportSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  subject: {
    type: String,
  },
  query: {
    type: String,
  },
  reply: {
    type: String,
  },
  replayedByAdmin: {
    type: Boolean,
    default: false,
  },
});

const Support = mongoose.model("Support", supportSchema);

module.exports = Support;
