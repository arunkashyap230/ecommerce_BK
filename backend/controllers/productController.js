const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    const product = new Product({
      name,
      price,
      description,
      imageUrl,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Error in createProduct:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to get products", error });
  }
};

module.exports = { createProduct, getProducts };
