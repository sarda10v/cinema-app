const Review = require("../models/Review.model");

module.exports.reviewController = {
  addReview: async (req, res) => {
    try {
      const review = await Review.create({
        reviews: req.body.reviews,
        user: req.body.user,
        cinema: req.body.cinema,
      });
      // пример использования populate на методе POST
      const data = await review.populate("user");
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  },

  deleteReviewById: async (req, res) => {
    try {
      await Review.findByIdAndRemove(req.params.id);
      res.json("удален");
    } catch (err) {
      res.json(err);
    }
  },

  editReviewById: async (req, res) => {
    try {
      const review = await Review.findByIdAndUpdate(req.params.id, {
        reviews: req.body.reviews,
        user: req.body.user,
        cinema: req.body.cinema,
      });
      res.json(review);
    } catch (err) {
      res.json(err);
    }
  },

  getReviews: async (req, res) => {
    try {
      const review = await Review.find().populate("user");
      const data = await res.json(review);
      return data;
    } catch (err) {
      res.json(err);
    }
  },

  getReviewsByCinema: async (req, res) => {
    try {
      const review = await Review.find({ cinema: req.params.id });
      return res.json(review);
    } catch (err) {
      return res.json({ error: err.message });
    }
  },

  addLike: async (req, res) => {
    try {
      const review = await Review.findByIdAndUpdate(req.params.id, {
        $push: { like: req.body.like },
      });
      const data = await review.populate("like");
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  },

  deleteLike: async (req, res) => {
    try {
      const review = await Review.findByIdAndUpdate(req.params.id, {
        $pull: {
          like: req.body.like,
        },
      });
      return res.json(review);
    } catch (err) {
      res.json(err);
    }
  },
};
