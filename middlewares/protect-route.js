const protectRoutes = (req, res, next) => {
  if (!res.locals.user || !res.locals.isAuth) {
    return res.redirect("/401");
  }

  if (!res.locals.isAdmin) {
    return res.redirect("/403");
  }

  // if (req.path.startsWith("/admin") && !res.locals.isAdmin) {
  //   return res.redirect("/403");
  // }

  next();
};

module.exports = protectRoutes;
