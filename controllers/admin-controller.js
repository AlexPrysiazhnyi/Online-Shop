const Product = require("../models/product-model");
const Order = require("../models/order-model");

const getProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.fetchProducts();
  } catch (error) {
    return next(error);
  }

  res.render("admin/products/all-products", { products });
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

const getUpdateProduct = async (req, res, next) => {
  let singleProduct;
  try {
    singleProduct = await Product.findSingleProduct(req.params.id);
  } catch (error) {
    return next(error);
  }
  res.render("admin/products/update-product", { product: singleProduct });
};

const updateProduct = async (req, res, next) => {
  let singleProduct;
  let updatedProductInfo = req.body;
  try {
    singleProduct = await Product.findSingleProduct(req.params.id);
  } catch (error) {
    return next(error);
  }

  if (req.file) {
    singleProduct.replaceImage(req.file);
    updatedProductInfo = {
      ...req.body,
      image: singleProduct.image,
      imagePath: singleProduct.imagePath,
      imageUrl: singleProduct.imageUrl,
    };
  }

  try {
    await singleProduct.updateProduct(updatedProductInfo);
  } catch (error) {
    return next(error);
  }

  res.redirect("/admin/products");
};

const deleteProduct = async (req, res, next) => {
  try {
    await Product.deleteProduct(req.params.id);
  } catch (error) {
    return next(error);
  }
  res.redirect("/admin/products");
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAllOrders();
    res.render("admin/orders/admin-orders", {
      orders,
    });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  const orderId = req.params.id;
  const newStatus = req.body.newStatus;

  try {
    const order = await Order.findOrderById(orderId);
    order.status = newStatus;
    await order.update();

    res.json({ message: "Order updated", newStatus: newStatus });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getNewProduct,
  addNewProduct,
  getUpdateProduct,
  updateProduct,
  deleteProduct,
  getOrders,
  updateOrder,
};
