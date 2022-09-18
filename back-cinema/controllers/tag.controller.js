const Tag = require("../models/Tag.model");

module.exports.tagController = {
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

  deleteTagById: async (req, res) => {
    try {
      const tag = await Tag.findByIdAndRemove(req.params.id);
      return res.json(tag);
    } catch (err) {
      res.json(err);
    }
  },

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

  getTags: async (req, res) => {
    try {
      const tag = await Tag.find();
      return res.json(tag);
    } catch (err) {
      res.json(err);
    }
  },
};
