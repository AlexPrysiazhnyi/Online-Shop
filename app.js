const path = require("path");
const express = require("express");
// const expressSession = require("express-session");
const csrf = require("csurf");
const db = require("./data/database");
const csrfToken = require("./middlewares/csrf");
const authRoutes = require("./routes/auth-routes");
const errorHandler = require("./middlewares/error-handler");
const sessionConfig = require("./config/session-config");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(sessionConfig());
app.use(csrf());
app.use(csrfToken);

app.use(authRoutes);
app.use(errorHandler);

db.connectToDB()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
    console.log("Connection Refused!");
  });
