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

const getProductDetails = async (req, res, next) => {
  let singleProduct;
  try {
    singleProduct = await Product.findSingleProduct(req.params.id);
  } catch (error) {
    return next(error);
  }

  res.render("customer/products/product-details", { product: singleProduct });
};

module.exports = {
  getAllProducts,
  getProductDetails,
};
