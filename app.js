const path = require("path");
const express = require("express");
// const expressSession = require("express-session");
const csrf = require("csurf");
const db = require("./data/database");

const sessionConfig = require("./config/session-config");
const csrfToken = require("./middlewares/csrf");
const serverSideErrorHandler = require("./middlewares/error-handler");
const userAuthMiddleware = require("./middlewares/check-auth");
const protectRoutesMiddleware = require("./middlewares/protect-route");
const authRoutes = require("./routes/auth-routes");
const baseRoutes = require("./routes/base-routes");
const productRoutes = require("./routes/product-routes");
const adminRoutes = require("./routes/admin-routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/data/multimedia", express.static("product-data"));
app.use(express.urlencoded({ extended: false }));
app.use(sessionConfig());
app.use(csrf());
app.use(csrfToken);
app.use(userAuthMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);
app.use(protectRoutesMiddleware);
app.use("/admin", adminRoutes);
app.use((req, res) => {
  res.render("errors/404");
});
app.use(serverSideErrorHandler);

db.connectToDB()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
    console.log("Connection Refused!");
  });
