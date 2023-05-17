const { mongoose, Schema } = require("../db");

// Crear esquema y modelo User...

const tweetSchema = new Schema({
  body: String,
  author: String,
  createdAt: Date,
  likes: Array,
});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
