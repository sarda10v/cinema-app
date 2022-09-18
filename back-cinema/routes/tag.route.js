const { Router } = require("express");
const { tagController } = require("../controllers/tag.controller");

const router = Router();

router.post("/tag", tagController.addTag);
router.delete("/tag/:id", tagController.deleteTagById);
router.patch("/tag/:id", tagController.editTagById);
router.get("/tag", tagController.getTags);

module.exports = router;
