const userAuthenticated = (req, res, next) => {
  if (!req.session.user || !req.session.isAuth) {
    return next();
  }

  res.locals.user = req.session.user;
  res.locals.isAuth = req.session.isAuth;
  res.locals.isAdmin = req.session.isAdmin;
  next();
};

module.exports = userAuthenticated;
