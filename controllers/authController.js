const { faker } = require("@faker-js/faker");
faker.locale = "es";

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
async function store(req, res) {
  const { firstname, lastname, email, password } = req.body;
  const passwordHashed = await bcrypt.hash(password, 8);
  const user = new User({
    firstname: firstname,
    lastname: lastname,
    password: passwordHashed,
    username: faker.name.firstName().toLowerCase(),
    email: email,
    description: faker.lorem.sentence(),
    profileImg: faker.image.avatar(),
    createdAt: faker.date.between({
      from: "2020-01-01T00:00:00.000Z",
      to: "2030-01-01T00:00:00.000Z",
    }),
  });
  await User.save(user);
  if (user) {
    req.login(user, () => res.redirect("/"));
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
  create,
  store,
  edit,
  update,
  destroy,
};
