const logoutUser = (req, action) => {
  req.session.user = null;
  req.session.isAuth = false;

  req.session.save(action);
};

module.exports = logoutUser;
