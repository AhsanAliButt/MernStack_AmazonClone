const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
});

// Create a model based on the schema
const PaymentModel = mongoose.model("Payment", paymentSchema);

// Export the model
module.exports = PaymentModel;
