const Customer = require("../models/Customer");
const bcrypt = require("bcryptjs");

// @desc    Register a new customer
// @route   POST /api/customers/signup
// @access  Public
const registerCustomer = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    // Check if user already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new customer
    const newCustomer = new Customer({
      fullName,
      email,
      password: hashedPassword,
      phone,
    });

    await newCustomer.save();

    res.status(201).json({ message: "Customer registered successfully" });
  } catch (err) {
    console.error("Error registering customer:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Login customer
// @route   POST /api/customers/login
// @access  Public
const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // You can generate a JWT token here if needed
    res.status(200).json({ message: "Login successful", customer });
  } catch (err) {
    console.error("Error logging in customer:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerCustomer,
  loginCustomer,
};
