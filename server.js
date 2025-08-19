require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//connect to mongodb
mongoose.connect("mongodb://localhost:27017/shopData").then(() => {
  console.log("mongodb connected");
});

app.listen(4000, () => {
  console.log("server running on port 4000 ");
});
