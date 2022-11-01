const Product = require("../models/product-model");

const getAllProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.fetchProducts();
  } catch (error) {
    return next(error);
  }
  res.render("customer/products/all-products", { products });
};

module.exports = {
  getAllProducts,
};
