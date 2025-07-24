const twilio = require("twilio");
require("dotenv").config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendWhatsAppMessage = async (to, orderDetails) => {
  try {
    const message = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:+91${to}`, // Ensure mobile number is correct format
      body: `🛒 Hello ${orderDetails.customerName}, your order of ₹${orderDetails.totalAmount} has been placed successfully! ✅`,
    });

    console.log("✅ WhatsApp message sent:", message.sid);
  } catch (error) {
    console.error("❌ WhatsApp send error:", error.message);
  }
};

module.exports = sendWhatsAppMessage;
