const Cinema = require("../models/Cinema.model");

module.exports.cinemaController = {
  // !! POST
  addCinema: async (req, res) => {
    const { image, name, description, year, actors, tags, genres, reviews } =
      req.body;
    try {
      const cinema = await Cinema.create({
        image,
        name,
        description,
        year,
        actors,
        tags,
        genres,
        reviews,
      });
      return res.json(cinema);
    } catch (err) {
      res.json(err);
    }
  },

  // !! DELETE
  deleteCinemaById: async (req, res) => {
    try {
      const cinema = await Cinema.findByIdAndRemove(req.params.id);
      return res.json(cinema);
    } catch (err) {
      res.json(err);
    }
  },

  // !! PATCH
  editCinemaById: async (req, res) => {
    const { image, name, description, year, actors, tags, genres, reviews } =
      req.body;

    try {
      const cinema = await Cinema.findByIdAndUpdate(req.params.id, {
        image,
        name,
        description,
        year,
        actors,
        tags,
        genres,
        reviews,
      });
      return res.json(cinema);
    } catch (err) {
      res.json(err);
    }
  },

  // !! GET
  getCinemas: async (req, res) => {
    try {
      const { page = 1, limit = 4 } = req.query;
      const cinema = await Cinema.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate("actors tags genres reviews");
      return res.json(cinema);
    } catch (err) {
      res.json(err);
    }
  },

  // !! PATCH ARR ACTOR'S
  addActorInArr: async (req, res) => {
    try {
      const cinema = await Cinema.findByIdAndUpdate(req.params.id, {
        $push: { actors: req.params.actorId },
      });
      return res.json(cinema);
    } catch (err) {
      res.json(err);
    }
  },
  deleteActorInArr: async (req, res) => {
    try {
      const cinema = await Cinema.findByIdAndUpdate(req.params.id, {
        $pull: { actors: req.params.actorId },
      });
      return res.json(cinema);
    } catch (err) {
      res.json(err);
    }
  },

  // !! PATCH ARR TAG'S
  addTagInArr: async (req, res) => {
    try {
      const cinema = await Cinema.findByIdAndUpdate(req.params.id, {
        $push: { tags: req.params.tagId },
      });
      return res.json(cinema);
    } catch (err) {
      res.json(err);
    }
  },
  deleteTagInArr: async (req, res) => {
    try {
      const cinema = await Cinema.findByIdAndUpdate(req.params.id, {
        $pull: { actors: req.params.actorId },
      });
      return res.json(cinema);
    } catch (err) {
      res.json(err);
    }
  },

  // !! PATCH ARR GENRE'S
  addGenreInArr: async (req, res) => {
    try {
      const cinema = await Cinema.findByIdAndUpdate(req.params.id, {
        $push: { genres: req.params.genreId },
      });
      return res.json(cinema);
    } catch (err) {
      res.json(err);
    }
  },
  deleteGenreInArr: async (req, res) => {
    try {
      const cinema = await Cinema.findByIdAndUpdate(req.params.id, {
        $pull: { genres: req.params.genreId },
      });
      return res.json(cinema);
    } catch (err) {
      res.json(err);
    }
  },

  // !! PATCH ARR REVIEW'S
  addReviewInArr: async (req, res) => {
    try {
      const cinema = await Cinema.findByIdAndUpdate(req.params.id, {
        $push: { reviews: req.params.reviewId },
      });
      return res.json(cinema);
    } catch (err) {
      res.json(err);
    }
  },
  deleteReviewInArr: async (req, res) => {
    try {
      const cinema = await Cinema.findByIdAndUpdate(req.params.id, {
        $pull: { reviews: req.params.reviewId },
      });
      return res.json(cinema);
    } catch (err) {
      res.json(err);
    }
  },
};
