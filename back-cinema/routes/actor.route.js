const { Router } = require("express");
const { actorController } = require("../controllers/actor.controller");

const router = Router();

router.post("/actor", actorController.addActor);
router.delete("/actor/:id", actorController.deleteActorById);
router.patch("/actor/:id", actorController.editActorById);
router.get("/actor", actorController.getActors);

module.exports = router;