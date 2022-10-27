const express = require("express");
const adminController = require("../controllers/admin-controller");
const imageUploadMiddleware = require("../middlewares/image-upload");

const router = express.Router();

router.get("/products", adminController.getProducts);
router.get("/product/new", adminController.getNewProduct);
router.post("/product/new", imageUploadMiddleware, adminController.addNewProduct);

module.exports = router;