const Product = require("../models/product-model");

const getProducts = (req, res) => {
  res.render("admin/products/all-products");
};

const getNewProduct = (req, res) => {
  res.render("admin/products/new-product");
};

const addNewProduct = async (req, res, next) => {
  const productInfo = {
    ...req.body,
    image: req.file.filename,
  };

  const product = new Product(productInfo);
  try {
    await product.save();
  } catch (error) {
    return next(error);
  }

  res.redirect("/admin/products");
};

module.exports = {
  getProducts,
  getNewProduct,
  addNewProduct,
};
