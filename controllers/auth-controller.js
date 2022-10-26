const User = require("../models/user-model");

const getSignup = (req, res) => {
  res.render("customer/auth/signup");
};

const signup = async (req, res) => {
  const body = req.body;
  const user = new User(
    body.email,
    body.password,
    body["full-name"],
    body.address,
    body.city,
    body.province,
    body.postal,
    body.unit
  );

  await user.signup();
  res.redirect("/login");
};

const getLogin = (req, res) => {
  res.render("customer/auth/login", { existingUser: "Dummy!" });
};

const login = async (req, res) => {
  const user = new User(req.body.email, req.body.password);
  const existingUser = await user.userExists();

  if (!existingUser) {
    console.log("User does not exist!");
    return res.redirect("/login");
  }

  const passwordIsCorrect = await user.passwordIsCorrect();
  if (!passwordIsCorrect) {
    console.log("Incorrect Password!");
    return res.redirect("/login");
  }

  req.session.user = {
    id: existingUser._id,
    email: existingUser.email,
    name: existingUser.name,
  };
  req.session.isAuth = true;

  req.session.save(() => {
    res.redirect("/signup");
  });
};

module.exports = {
  getSignup,
  getLogin,
  signup,
  login,
};
