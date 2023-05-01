const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const userSchema = new Schema({
  profilePhoto: {
    type: String,
  },
  userName: {
    type: String,
  },
  notificationToken: {
    type: String,
  },
  facebookUid: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  orders: [
    {
      type: Schema.ObjectId,
      ref: 'Orders'
    },
  ],
  address: [
    {
      // type: String,s
      type: Schema.ObjectId,
      ref: "Address",
    },
  ],
  reviews: [
    {
      // type: Schema.ObjectId,
      type: String,
    },
  ],
  myDesigns: [
    {
      type: String,
    },
  ],
  // location: {
  //   type: {
  //     type: String, // Don't do `{ location: { type: String } }`
  //     enum: ["Point"], // 'location.type' must be 'Point'
  //     default: "Point",
  //     required: true,
  //   },
  //   coordinates: {
  //     type: [Number],
  //     // index: "2dsphere",
  //     required: true,
  //   },
  // },
});
// userSchema.index({ location: "2dsphere" });

const User = mongoose.model("User", userSchema);

module.exports = User;
