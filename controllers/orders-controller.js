const Order = require("../models/order-model");
const User = require("../models/user-model");

const protectRoutes = (req, res, next) => {
  if (!res.locals.user || !res.locals.isAuth) {
    return res.redirect("/401");
  }
  next();
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAllOrdersForUser(res.locals.user.id);
    res.render("customer/orders/all-orders", { orders });
  } catch (error) {
    next(error);
  }
};

const addOrder = async (req, res, next) => {
  const cart = res.locals.cart;
  const userId = res.locals.user.id;
  let userData;
  try {
    userData = await User.findUserById(userId);
  } catch (error) {
    next(error);
    return;
  }

  const order = new Order(cart, userData);
  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }

  req.session.cart = null;

  res.redirect("/orders");
};

module.exports = {
  protectRoutes,
  addOrder,
  getOrders,
};
