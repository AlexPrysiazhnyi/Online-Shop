const path = require("path");
const express = require("express");
// const expressSession = require("express-session");
const csrf = require("csurf");
const db = require("./data/database");

let PORT = 3000;

if (process.env.PORT) {
  PORT = process.env.PORT;
}

const sessionConfig = require("./config/session-config");
const csrfToken = require("./middlewares/csrf");
const errorHandler = require("./middlewares/error-handler");
const userAuthMiddleware = require("./middlewares/check-auth");
const protectRoutesMiddleware = require("./middlewares/protect-route");
const cartSessionMiddleware = require("./middlewares/cart");
const updateCartPricesMiddleware = require("./middlewares/update-cart-prices");
const authRoutes = require("./routes/auth-routes");
const baseRoutes = require("./routes/base-routes");
const productRoutes = require("./routes/product-routes");
const cartRoutes = require("./routes/cart-routes");
const adminRoutes = require("./routes/admin-routes");
const ordersRoutes = require("./routes/orders-routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/data/multimedia", express.static("product-data"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(sessionConfig());
app.use(csrf());
app.use(csrfToken);

app.use(cartSessionMiddleware);
app.use(updateCartPricesMiddleware);
app.use(userAuthMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", ordersRoutes);
app.use("/admin", protectRoutesMiddleware, adminRoutes);

app.use(errorHandler.resourseNotFound);
app.use(errorHandler.serverSide);

db.connectToDB()
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error);
    console.log("Connection Refused!");
  });
