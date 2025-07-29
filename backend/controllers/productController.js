// controllers/productController.js
const Product = require("../models/Product");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

const addProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const image = req.file;

    if (!image) return res.status(400).json({ message: "Image is required" });

    // Upload to cloudinary
    const result = await cloudinary.uploader.upload(image.path, {
      folder: "products",
    });

    // Save to DB
    const product = new Product({
      name,
      price,
      description,
      imageUrl: result.secure_url,
    });

    await product.save();

    // Remove temp file
    fs.unlinkSync(image.path);

    res.status(201).json({ message: "Product added", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addProduct };
