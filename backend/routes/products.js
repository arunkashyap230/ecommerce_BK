// routes/product.js
const express = require("express");
const router = express.Router();
const { addProduct } = require("../controllers/productController");
const upload = require("../middleware/cloudinaryUpload");
const Product = require("../models/Product");

router.post("/upload", upload.single("image"), addProduct);

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json({ products });
});

module.exports = router;
