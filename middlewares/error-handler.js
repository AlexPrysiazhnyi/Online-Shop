const serverSideErrorHandler = (error, req, res, next) => {
  console.log(error);
  res.status(500).render("errors/500");
};

module.exports = serverSideErrorHandler;