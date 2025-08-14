const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  //   id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  totalItems: { type: Number, required: true },
  pricePerPiece: { type: Number, required: true },
  totalPrice: { type: Number },
  stockId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Stock",
  },
});

module.exports = mongoose.model("Stock", stockSchema);
