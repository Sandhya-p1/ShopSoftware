require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "",
    credentials: true,
  })
);

//connect to mongodb
mongoose.connect("mongodb://localhost:27017/shopData").then(() => {
  console.log("mongodb connected");
});

app.listen(6000, () => {
  console.log("server running on port 6000 ");
});
