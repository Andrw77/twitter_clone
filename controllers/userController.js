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
  create,
  store,
  edit,
  update,
  destroy,
};
