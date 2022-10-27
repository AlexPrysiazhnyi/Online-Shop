const createSession = (req, existingUser, action) => {
  req.session.user = {
    id: existingUser._id.toString(),
    email: existingUser.email,
    name: existingUser.name,
  };
  req.session.isAuth = true;
  req.session.isAdmin = existingUser.isAdmin;

  req.session.save(action);
};

module.exports = createSession;
