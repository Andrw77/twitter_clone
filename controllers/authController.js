const User = require("../models/User");
const passport = require("passport");

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
  showLogin,
  showRegister,
  login,
  create,
  store,
  edit,
  update,
  destroy,
};
