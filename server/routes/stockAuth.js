const express = require("express");
const router = express.Router();
const Stock = require("../models/stockModel");
const verifyToken = require("../middleware/jwtAuth");

//get stock using jwt token
router.get("/viewStock", verifyToken, async (req, res) => {
  try {
    const stockId = req.stock.id;
    const stocks = await Stock.find({ stockId });
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stock data" });
  }
});

//add stock
router.post("/addStock", verifyToken, async (req, res) => {
  try {
    const { name, category, pricePerPiece, totalItems } = req.body;
    //condition check
    if (!name || !category || !pricePerPiece || !totalItems) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (pricePerPiece <= 0 || totalItems <= 0) {
      return res
        .status(401)
        .json({ message: "please enter valid price and items " });
    }
    ////////////////////////////////////////////////////////////////////////////////////
    const stockId = req.stock.id;

    const existingStock = await Stock.findOne({ stockId, name, category });
    if (existingStock) {
      existingStock.totalItems += totalItems;
      existingStock.totalPrice =
        existingStock.pricePerPiece * existingStock.totalItems;
      await existingStock.save();
      res.json({ message: "Stock Added", stock: existingStock });
    } else {
      const totalPrice = pricePerPiece * totalItems;
      const data = new Stock({
        name,
        category,
        totalItems,
        pricePerPiece,
        totalPrice: totalPrice,
        stockId,
      });
      await data.save();
      res.json({ message: "New Stock Added ", data });
    }
  } catch (error) {
    res.status(500).json({ message: "Error adding new stock", error });
  }
});

//removing stock or deleting
router.delete("/reduceStock", verifyToken, async (req, res) => {
  try {
    const { name, category, pricePerPiece, totalItems } = req.body;
    const stockId = req.stock.id;
    const existingStock = await Stock.findOne({
      stockId,
      name,
      category,
      pricePerPiece,
    });
    if (!existingStock) {
      res.json({ message: "Stock is not found" });
    }
    if (existingStock.totalItems >= totalItems && totalItems > 0) {
      existingStock.totalItems -= totalItems;
      existingStock.totalPrice = existingStock.totalItems * pricePerPiece;

      await existingStock.save();
      res.json({
        message: "Stock is reduced. You can check it on viewStock",
      });
    } else {
      res.json({ message: "Stock item qunatity is not valid" });
    }
    if (existingStock.totalItems === 0) {
      await existingStock.deleteOne();
      return res.json("Stock is removed fully");
    }
  } catch (error) {
    res.json({ message: "Stock is not reduced" });
  }
});

module.exports = router;
