const { mongoose, Schema } = require("../db");

// Crear esquema y modelo User...

const tweetSchema = new Schema({
  body: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: Date,
  likes: Array,
});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
