const Tweet = require("../models/Tweet");
const User = require("../models/User");

// Display a listing of the resource.
async function showUserProfile(req, res) {
  const user = req.user;
  return res.render("pages/profile", user);
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

async function likeStore(req, res) {
  const userId = req.user._id;
  const tweetId = req.params.tweetId;
  const tweet = await Tweet.findById(tweetId);
  if (!tweet.likes.includes(userId)) {
    await Tweet.updateOne({ _id: tweetId }, { $push: { likes: userId } });
    return res.redirect("back");
  } else {
    tweet.likes.pull({ id: userId });
    await Tweet.updateOne({ _id: tweetId }, { $pull: { likes: userId } });
    return res.redirect("back");
  }
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  showUserProfile,
  showFollowers,
  showFollowing,
  likeStore,
  create,
  store,
  edit,
  update,
  destroy,
};
