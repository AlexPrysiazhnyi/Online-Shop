const User = require("../models/user-model");
const createSession = require("../util/session-creation");
const logoutSessionChange = require("../util/logout");
const userInputIsValid = require("../util/signup-validation");
const flashErrorDataToSession = require("../util/input-error-flashing");

const getSignup = (req, res) => {
  let sessionData = req.session.inputData;

  if (!sessionData) {
    sessionData = flashErrorDataToSession.initialSignup();
  }
  req.session.inputData = null;
  res.render("customer/auth/signup", { sessionData });
};

const signup = async (req, res, next) => {
  const body = req.body;
  const user = new User(
    body.email,
    body.password,
    body.name,
    body.address,
    body.city,
    body.province,
    body.postal,
    body.unit
  );

  user["confirm-password"] = body["confirm-password"];
  if (!userInputIsValid(user)) {
    flashErrorDataToSession.dataToSignUpSession(
      req,
      user,
      "Invalid Input. Please try again"
    );
    req.session.save(() => {
      res.redirect("/signup");
    });
    return;
  }

  const existingUser = await user.userExists();

  if (existingUser) {
    flashErrorDataToSession.dataToSignUpSession(
      req,
      user,
      "Email Already Registered. Please use another one!"
    );
    req.session.save(() => {
      res.redirect("/signup");
    });
    return;
  }

  try {
    await user.signup();
  } catch (error) {
    return next(error);
  }
  res.redirect("/login");
};

const getLogin = (req, res) => {
  let sessionData = req.session.inputData;

  if (!sessionData) {
    sessionData = flashErrorDataToSession.initialLogin();
  }
  req.session.inputData = null;
  res.render("customer/auth/login", { sessionData });
};

const login = async (req, res, next) => {
  const user = new User(req.body.email, req.body.password);

  let existingUser;
  try {
    existingUser = await user.userExists();
  } catch (error) {
    return next(error);
  }

  if (!existingUser) {
    flashErrorDataToSession.dataToLoginSession(req, user, "User Not Found!");
    req.session.save(() => {
      res.redirect("/login");
    });
    return;
  }

  let passwordIsCorrect;
  try {
    passwordIsCorrect = await user.passwordIsCorrect();
  } catch (error) {
    return next(error);
  }
  if (!passwordIsCorrect) {
    flashErrorDataToSession.dataToLoginSession(
      req,
      user,
      "Error Occured! Please check your credentials and try again!"
    );
    req.session.save(() => {
      res.redirect("/login");
    });
    return;
  }

  createSession(req, existingUser, () => {
    res.redirect("/");
  });
};

const logout = (req, res) => {
  logoutSessionChange(req, () => {
    res.redirect("/");
  });
};

module.exports = {
  getSignup,
  getLogin,
  signup,
  login,
  logout,
};
