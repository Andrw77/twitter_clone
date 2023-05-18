const User = require("../models/User");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function showFollowers(req, res) {
  const userFollowers = await User.find({ followers: { $exists: true } });
  res.render("pages/followers", { userFollowers });
}

async function showFollowing(req, res) {
  const userFollowings = await User.find({ following: { $exists: true } });
  res.render("pages/following", { userFollowings });
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
  index,
  showFollowers,
  showFollowing,
  create,
  store,
  edit,
  update,
  destroy,
};
