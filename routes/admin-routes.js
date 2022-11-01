const express = require("express");
const adminController = require("../controllers/admin-controller");
const imageUploadMiddleware = require("../middlewares/image-upload");

const router = express.Router();

router.get("/products", adminController.getProducts);
router.get("/product/new", adminController.getNewProduct);
router.post("/product/new", imageUploadMiddleware, adminController.addNewProduct);
router.get("/products/:id", adminController.getUpdateProduct);
router.post("/products/:id", imageUploadMiddleware, adminController.updateProduct);
router.post("/delete/:id", adminController.deleteProduct);

module.exports = router;