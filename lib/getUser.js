const { default: User } = require("@/models/user/userModel");

export default async function getUser(id) {
  const user = await User.findById(id);
  return user;
}
