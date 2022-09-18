const mongoose = require("mongoose");
const cinemaSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  trailer: {
    // !! проверить ключ!
    type: String,
    required: true,
  },
  actors: [
    {
      ref: "Actor",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  tags: [
    {
      ref: "Tag",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  genres: [
    {
      ref: "Genre",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  reviews: [
    {
      ref: "Review",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

const Cinema = mongoose.model("Cinema", cinemaSchema);
module.exports = Cinema;
