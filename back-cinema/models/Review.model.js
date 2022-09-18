const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  reviews: {
    type: String,
    required: true,
  },
  user: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
  cinema: {
    ref: "Cinema",
    type: mongoose.Schema.Types.ObjectId,
  },
  like: [
    {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
