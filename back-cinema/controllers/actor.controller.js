const Actor = require("../models/Actor.model");

module.exports.actorController = {
  addActor: async (req, res) => {
    try {
      const actor = await Actor.create({
        image: req.body.image,
        fullname: req.body.fullname,
      });
      return res.json(actor);
    } catch (err) {
      res.json(err);
    }
  },

  deleteActorById: async (req, res) => {
    try {
      const actor = await Actor.findByIdAndRemove(req.params.id);
      return res.json(actor);
    } catch (err) {
      res.json(err);
    }
  },

  editActorById: async (req, res) => {
    try {
      const actor = await Actor.findByIdAndUpdate(req.params.id, {
        image: req.body.image,
        fullname: req.body.fullname,
      });
      return res.json(actor);
    } catch (err) {
      res.json(err);
    }
  },

  getActors: async (req, res) => {
    try {
      const actor = await Actor.find();
      return res.json(actor);
    } catch (err) {
      res.json(err);
    }
  },
};
