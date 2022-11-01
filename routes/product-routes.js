const express = require("express");
const router = express.Router();

const productController = require("../controllers/product-controller");

router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProductDetails);

module.exports = router;
