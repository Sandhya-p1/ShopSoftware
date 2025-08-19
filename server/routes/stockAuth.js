const express = require("express");
const router = express.Router();
const Stock = require("../models/stockModel");
const verifyToken = require("../middleware/jwtAuth");
const Sale = require("../models/salesModel");
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
router.put("/reduceStock", verifyToken, async (req, res) => {
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
      return res.json({ message: "Stock is not found" });
    }
    if (existingStock.totalItems >= totalItems && totalItems > 0) {
      //recording the sale in sales collection

      await Sale.create({
        name,
        category,
        quantitySold: totalItems,
        pricePerPiece,
        totalPrice: pricePerPiece * totalItems,
        userId: req.stock.id,
        stockId,
        soldAt: new Date(),
      });

      existingStock.totalItems -= totalItems;
      existingStock.totalPrice = existingStock.totalItems * pricePerPiece;

      await existingStock.save();
      return res.json({
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
    return res.json({ message: "Stock is not reduced" });
  }
});

// getting monthly sales report

router.get("/dailySales", verifyToken, async (req, res) => {
  try {
    const userId = req.stock.id;
    // console.log("user id from token", req.user.id);

    const dailySales = await Sale.aggregate([
      {
        $match: { userId },
      },
      {
        $group: {
          _id: {
            name: "$name",
            category: "$category",
            day: { $dayOfMonth: "$soldAt" },
            month: { $month: "$soldAt" },
            year: { $year: "$soldAt" },
          },
          totalItems: { $sum: "$quantitySold" },
          totalAmount: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 },
      },
    ]);
    res.json(dailySales);
  } catch (error) {
    res.status(400).json({ message: "Error fetching daily sales", error });
  }
});

//monthly sales data
router.get("/monthlySales", verifyToken, async (req, res) => {
  try {
    const userId = req.stock.id;
    const monthlySales = await Sale.aggregate([
      {
        $match: { userId },
      },
      {
        $group: {
          _id: {
            name: "$name",
            category: "$category",
            month: { $month: "$soldAt" },
            year: { $year: "$soldAt" },
          },
          totalItems: { $sum: "$quantitySold" },
          totalAmount: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1 },
      },
    ]);
    res.json(monthlySales);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error fetching monthly data", error });
  }
});

//yearly sales
router.get("/yearlySales", verifyToken, async (req, res) => {
  try {
    const userId = req.stock.id;
    const yearlySales = await Sale.aggregate([
      {
        $match: { userId },
      },
      {
        $group: {
          _id: {
            name: "$name",
            category: "$category",
            year: { $year: "$soldAt" },
          },
          totalItems: { $sum: "$quantitySold" },
          totalAmount: { $sum: "$totalPrice" },
        },
      },
    ]);
    res.json(yearlySales);
  } catch (error) {
    return res.status(400).json("Error fetching yearly sales", error);
  }
});
module.exports = router;
