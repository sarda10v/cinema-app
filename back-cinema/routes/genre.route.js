const { Router } = require("express");
const { genreController } = require("../controllers/genre.controller");

const router = Router();

router.post("/genre", genreController.addGenre);
router.delete("/genre/:id", genreController.deleteGenreById);
router.patch("/genre/:id", genreController.editGenreById);
router.get("/genre", genreController.getGenres);

module.exports = router;
