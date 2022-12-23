const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, "assets")));
app.use(morgan("dev"));
app.use(require("./routes/index"));

const { PORT, SERVER } = process.env;

const connectAndStartServer = async () => {
  try {
    await mongoose.connect(SERVER);
    app.listen(PORT, () => {
      console.log("Server it's started!");
    });
  } catch (e) {
    console.log(`Connection error: ${e.toString()}`);
  }
};
connectAndStartServer();
