const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const posts = require("./routes/posts");
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

//mongoose connect
//mongoose connect
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("成功連接資料庫");
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/", (req, res, next) => {
  res.send("HexSchool week 3");
});

app.use("/posts", posts);

//Error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

//catch all routes not found
app.use("*", (err, req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "找不到該頁面",
  });
});

app.listen(process.env.PORT || 3000, () =>
  console.log("listening on port 3000...")
);
