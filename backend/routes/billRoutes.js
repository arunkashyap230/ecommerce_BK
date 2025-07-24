const express = require("express");
const router = express.Router();
const { handleCheckout } = require("../controllers/billController");

// Route to handle order checkout
router.post("/checkout", handleCheckout);

module.exports = router;
