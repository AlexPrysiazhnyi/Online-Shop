const Product = require("../models/product-model");

const getCart = (req, res) => {
  res.render("customer/cart/cart");
};

const addProductToCart = async (req, res, next) => {
  const cart = res.locals.cart;
  let product;
  try {
    product = await Product.findSingleProduct(req.body.productId);
  } catch (error) {
    next(error);
    return;
  }
  cart.addItem(product);
  req.session.cart = cart;

  res.status(201).json({
    message: "Success! The product has been added.",
    totalItems: cart.totalQuantity,
    totalPrice: cart.totalPrice,
  });
};

const updateProductInCart = async (req, res) => {
  const cart = res.locals.cart;
  const productId = req.body.productId;
  const updatedQuantity = req.body.updatedQuantity;
  const updatedCartItemPrice = cart.updateItem(productId, updatedQuantity);

  req.session.cart = cart;

  res.status(201).json({
    message: "Success! The product has been updated.",
    totalItems: cart.totalQuantity,
    totalPrice: cart.totalPrice,
    updatedCartItemPrice
  });
};

module.exports = {
  addProductToCart,
  getCart,
  updateProductInCart,
};
