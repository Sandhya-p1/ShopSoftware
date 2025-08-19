require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwtLoginRoutes = require("./routes/routeAuth");
const stockRoutes = require("./routes/stockAuth");
const verifyingToken = require("./middleware/jwtAuth");
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
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

//routes and token verify
app.use("/routeAuth", jwtLoginRoutes);
app.use("/jwtAuth", verifyingToken);
app.use("/stockAuth", stockRoutes);

app.get("/dashboard", verifyingToken, (req, res) => {
  res.json({
    message: "Welcome to the dashboard",
    user: req.user,
  });
});
app.listen(4000, () => {
  console.log("server running on port 4000 ");
});
