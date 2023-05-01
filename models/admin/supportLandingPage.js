const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const supportLandingPageSchema = new Schema({
  email: {
    type: String,
  },
  query: {
    type: String,
  },
});

const SupportLandingPage = mongoose.model(
  "SupportLandingPage",
  supportLandingPageSchema
);

module.exports = SupportLandingPage;
