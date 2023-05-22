const Tweet = require("../models/Tweet");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const formidable = require("formidable");

// Display a listing of the resource.
async function showUserProfile(req, res) {
  const userProf = await User.findOne({ username: req.params.username }).populate({
    path: "tweets",
    options: { sort: { createdAt: -1 } },
  });
  return res.render("pages/profile", { userProf });
}

// Display the specified resource.
async function showFollowers(req, res) {
  const user = req.user;
  const userId = await User.findById(req.user.id).populate("followers");
  const userFollowers = userId.followers;
  res.render("pages/followers", { userFollowers, user });
}

async function showFollowing(req, res) {
  const user = req.user;
  const userId = await User.findById(req.user.id).populate("following");
  const userFollowings = userId.following;
  res.render("pages/following", { userFollowings, user });
}

async function showRetweets(req, res) {
  const userProf = await User.findOne({ username: req.params.username }).populate("tweets");
  return res.render("pages/retweets", { userProf });
}

async function likeStore(req, res) {
  const userId = req.user._id;
  const tweetId = req.params.tweetId;
  const tweet = await Tweet.findById(tweetId);
  if (!tweet.likes.includes(userId)) {
    await Tweet.updateOne({ _id: tweetId }, { $push: { likes: userId } });
    return res.redirect("back");
  } else {
    await Tweet.updateOne({ _id: tweetId }, { $pull: { likes: userId } });
    return res.redirect("back");
  }
}

async function followingStore(req, res) {
  const user = req.user;
  const followerId = req.params.followerId;
  console.log(!user.following.includes(String(followerId)));
  if (!user.following.includes(String(followerId))) {
    await User.updateOne({ _id: user.id }, { $push: { following: followerId } });
    await User.updateOne({ _id: followerId }, { $push: { followers: user.id } });
    return res.redirect("back");
  } else {
    await User.updateOne({ _id: user.id }, { $pull: { following: followerId } });
    await User.updateOne({ _id: followerId }, { $pull: { followers: user.id } });
    return res.redirect("back");
  }
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  const userId = req.user._id;
  const body = req.body.body;
  console.log(req.body.body);
  const newTweet = await new Tweet({
    author: userId,
    body: body,
    createdAt: new Date(),
  });
  await User.updateOne({ _id: userId }, { $push: { tweets: newTweet.id } });
  console.log(newTweet);
  await newTweet.save();
  return res.redirect("back");
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {
  const form = formidable({
    multiples: false,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    console.log(fields, files);
    const { password } = fields;
    const passwordHashed = await bcrypt.hash(password, 8);
    console.log(files.image);
    if (password) {
      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          firstname: fields.firstname,
          lastname: fields.lastname,
          username: fields.username,
          email: fields.email,
          profileImg: files.image.newFilename,
          password: passwordHashed,
        },
      );
    } else {
      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          firstname: fields.firstname,
          lastname: fields.lastname,
          username: fields.username,
          email: fields.email,
          profileImg: files.image.newFilename,
        },
      );
    }

    res.redirect("back");
  });
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const userId = req.user._id;
  const tweetId = req.params.tweetId;
  console.log(tweetId);
  const tweet = await Tweet.findById(tweetId);
  await User.updateOne({ _id: userId }, { $pull: { tweets: tweetId } });
  if (String(tweet.author) === String(userId)) {
    await Tweet.deleteOne({ _id: tweetId });
  }
  res.redirect("back");
}

// Otros handlers...
// ...

module.exports = {
  showUserProfile,
  showFollowers,
  showFollowing,
  showRetweets,
  likeStore,
  followingStore,
  create,
  store,
  edit,
  update,
  destroy,
};
