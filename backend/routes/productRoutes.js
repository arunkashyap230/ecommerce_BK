const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createProduct,
  getProducts,
} = require("../controllers/productController"); // ✅ Import both at once

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), createProduct);
router.get("/", getProducts);

module.exports = router;
