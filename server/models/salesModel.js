const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  name: String,
  category: String,
  quantitySold: Number,
  pricePerPiece: Number,
  totalPrice: Number,
  stockId: String,
  userId: String,
  soldAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Sale", salesSchema);
