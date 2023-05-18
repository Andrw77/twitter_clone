const { mongoose, Schema } = require("../db");

// Crear esquema y modelo User...
// [{ type: Schema.Types.ObjectId, ref: "User" }]
const userSchema = new Schema({
  firstname: String,
  lastname: String,
  password: String,
  username: String,
  email: String,
  description: String,
  profileImg: String,
  tweets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: Date,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
