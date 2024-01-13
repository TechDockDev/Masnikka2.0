const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const OtpSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
      unique: true,
    },
    code: {
      type: Number,
      required: [true, "Code is required"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    createdAt: { type: Date, expires: 300 },
  },
  { timestamps: true }
);

const Otp = mongoose.models.Otp || mongoose.model("Otp", OtpSchema);

module.exports = Otp;
