const express = require("express");
const cartController = require("../controllers/cart-controller");

const router = express.Router();

router.get("/", cartController.getCart);
router.post("/items", cartController.addProductToCart);
router.patch("/items", cartController.updateProductInCart);

module.exports = router;
