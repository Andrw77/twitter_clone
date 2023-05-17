const { mongoose, Schema } = require("../db");

// Crear esquema y modelo User...
// [{ type: Schema.Types.ObjectId, ref: "User" }]
const userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  description: String,
  profileImg: String,
  tweets: Array,
  followers: Array,
  following: Array,
  createdAt: Date,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
