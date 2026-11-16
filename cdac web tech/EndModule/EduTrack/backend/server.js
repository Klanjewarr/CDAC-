require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URL)
  .then(() => app.listen(5000, () => console.log("Server up🚀🚀🚀")));

