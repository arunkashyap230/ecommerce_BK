const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  address: { type: String },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bill", billSchema);
