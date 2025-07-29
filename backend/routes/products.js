// routes/product.js
const express = require("express");
const router = express.Router();
const { addProduct } = require("../controllers/productController");
const upload = require("../middleware/cloudinaryUpload");

router.post("/upload", upload.single("image"), addProduct);

module.exports = router;
