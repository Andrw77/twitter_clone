const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcrypt");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function showLogin(req, res) {
  return res.render("pages/login");
}

// Display the specified resource.
async function showRegister(req, res) {
  return res.render("pages/register");
}

async function login(req, res) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })(req, res);
}

// Store a newly created resource in storage.
async function store(req, res) {
  const { firstname, lastname, username, email, password } = req.body;
  const passwordHashed = await bcrypt.hash(password, 8);
  const user = new User({
    firstname: firstname,
    lastname: lastname,
    password: passwordHashed,
    username: username,
    email: email,
    description: "dkmfghodnodnmgozdkmgozmrgopesesesesesesssssssssssssssssssssssssssssssssssss",
    profileImg: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5…",
  });
  await user.save();
  if (user) {
    res.redirect("/");
    //req.login(user, () => res.redirect("/"));
  } else {
    res.redirect("back");
  }
}

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
  showLogin,
  showRegister,
  login,
  store,
  edit,
  update,
  destroy,
};
