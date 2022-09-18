const Tag = require("../models/Tag.model");

module.exports.tagController = {
  // !! POST
  addTag: async (req, res) => {
    try {
      const tag = await Tag.create({
        tags: req.body.tags,
      });
      return res.json(tag);
    } catch (err) {
      res.json(err);
    }
  },

  // !! DELETE
  deleteTagById: async (req, res) => {
    try {
      const tag = await Tag.findByIdAndRemove(req.params.id);
      return res.json(tag);
    } catch (err) {
      res.json(err);
    }
  },

  // !! PATCH
  editTagById: async (req, res) => {
    try {
      const tag = await Tag.findByIdAndUpdate(req.params.id, {
        tags: req.body.tags,
      });
      return res.json(tag);
    } catch (err) {
      res.json(err);
    }
  },

  // !! GET
  getTags: async (req, res) => {
    try {
      const tag = await Tag.find();
      return res.json(tag);
    } catch (err) {
      res.json(err);
    }
  },
};
