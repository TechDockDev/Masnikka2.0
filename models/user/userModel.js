const mongoose = require("mongoose");
const { Schema } = mongoose;
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
    unique: true,
  },
  password: {
    type: String,
    select: false,
    require: true,
    min: [8, "Password must be 8 characters long"],
  },
  phoneNumber: {
    type: String,
    unique: true,
    require: true,
  },
  orders: [
    {
      type: Schema.ObjectId,
      ref: "Orders",
    },
  ],
  address: [
    {
      type: Schema.ObjectId,
      ref: "Address",
    },
  ],
  reviews: [{ type: String }],
  myDesigns: [{ type: String }],
});

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
