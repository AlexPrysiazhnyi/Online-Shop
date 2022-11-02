const resourseNotFound = (req, res) => {
  res.status(404).render("errors/404");
};

const serverSide = (error, req, res, next) => {
  console.log(error);

  if (error.code === 404) {
    resourseNotFound(req, res);
    return;
  }
  res.status(500).render("errors/500");
};

module.exports = { serverSide, resourseNotFound };
