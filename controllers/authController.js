const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const formidable = require("formidable");

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
async function logout(req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

// Store a newly created resource in storage.
async function store(req, res) {
  const form = formidable({
    multiples: false,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    console.log(fields, files);
    const { password } = fields;
    const passwordHashed = await bcrypt.hash(password, 8);
    const user = await User.create({
      firstname: fields.firstname,
      lastname: fields.lastname,
      username: fields.username,
      email: fields.email,
      profileImg: files.image.newFilename,
      password: passwordHashed,
    });
    if (user) {
      req.login(user, () => res.redirect("/"));
    } else {
      res.redirect("back");
    }
  });
}

// const user = new User({
//   firstname: firstname,
//   lastname: lastname,
//   password: passwordHashed,
//   username: username,
//   email: email,
//   description: "a",
//   profileImg: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5…",
// });
// await user.save();

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
  logout,
  store,
  edit,
  update,
  destroy,
};
