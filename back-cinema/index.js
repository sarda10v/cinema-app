require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, "assets")));

mongoose
  .connect(process.env.SERVER)

app.use(require("./routes/cinema.route"));
app.use(require("./routes/actor.route"));
app.use(require("./routes/genre.route"));
app.use(require("./routes/review.route"));
app.use(require("./routes/tag.route"));
app.use(require("./routes/user.route"));

app.listen(process.env.PORT, () => {
  console.log("Server it's started!");
});
