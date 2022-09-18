const Genre = require("../models/Genre.model");

module.exports.genreController = {
  addGenre: async (req, res) => {
    try {
      const genre = await Genre.create({
        genres: req.body.genres,
      });
      return res.json(genre);
    } catch (err) {
      res.json(err);
    }
  },

  deleteGenreById: async (req, res) => {
    try {
      const genre = await Genre.findByIdAndRemove(req.params.id);
      return res.json(genre);
    } catch (err) {
      res.json(err);
    }
  },

  editGenreById: async (req, res) => {
    try {
      const genre = await Genre.findByIdAndUpdate(req.params.id, {
        genres: req.body.genres,
      });
      return res.json(genre);
    } catch (err) {
      res.json(err);
    }
  },

  getGenres: async (req, res) => {
    try {
      const genre = await Genre.find();
      return res.json(genre);
    } catch (err) {
      res.json(err);
    }
  },
};
