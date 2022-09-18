const Actor = require("../models/Actor.model");

module.exports.actorController = {
  // !! POST
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

  // !! DELETE
  deleteActorById: async (req, res) => {
    try {
      const actor = await Actor.findByIdAndRemove(req.params.id);
      return res.json(actor);
    } catch (err) {
      res.json(err);
    }
  },

  // !! PATCH
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

  // !! GET
  getActors: async (req, res) => {
    try {
      const actor = await Actor.find();
      return res.json(actor);
    } catch (err) {
      res.json(err);
    }
  },
};
