const Product = require("../models/product-model");

const getCart = (req, res) => {
    res.render("customer/cart/cart");
}

const addProductToCart = async (req, res) => {
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
//   console.log(cart);

  res
    .status(201)
    .json({
      message: "Success! The cart has been updated.",
      totalItems: cart.totalQuantity,
      totalPrice: cart.totalPrice,
    });
};

module.exports = {
  addProductToCart,
  getCart,
};
