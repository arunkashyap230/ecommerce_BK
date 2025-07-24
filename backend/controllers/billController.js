const Bill = require("../models/Bill");
const sendWhatsAppMessage = require("../utils/sendWhatsApp");

const handleCheckout = async (req, res) => {
  try {
    const { customerName, mobileNumber, address, cartItems, totalAmount } =
      req.body;

    if (
      !customerName ||
      !mobileNumber ||
      !cartItems ||
      cartItems.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    const newBill = new Bill({
      customerName,
      mobileNumber,
      address,
      items: cartItems,
      totalAmount,
    });

    const savedBill = await newBill.save();

    // ✅ Send WhatsApp message
    await sendWhatsAppMessage(mobileNumber, {
      customerName,
      address,
      items: cartItems,
      totalAmount,
    });

    res.status(201).json({
      message: "Order placed successfully!",
      bill: savedBill,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { handleCheckout };
