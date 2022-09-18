const { Router } = require("express");
const { cinemaController } = require("../controllers/cinema.controller");

const router = Router();

router.post("/cinema", cinemaController.addCinema);
router.delete("/cinema/:id", cinemaController.deleteCinemaById);
router.patch("/cinema/:id", cinemaController.editCinemaById);
router.get("/cinema", cinemaController.getCinemas);

router.patch("/cinema/:id/actor/:actorId", cinemaController.addActorInArr);
router.patch("/cinema/:id/actor/remove/:actorId", cinemaController.deleteActorInArr);

router.patch("/cinema/:id/tag/:tagId", cinemaController.addTagInArr);
router.patch("/cinema/:id/tag/remove/:tagId", cinemaController.deleteTagInArr);

router.patch("/cinema/:id/genre/:genreId", cinemaController.addGenreInArr);
router.patch("/cinema/:id/genre/remove/:genreId", cinemaController.deleteGenreInArr);

router.patch("/cinema/:id/review/:reviewId", cinemaController.addReviewInArr);
router.patch("/cinema/:id/review/remove/:reviewId", cinemaController.deleteReviewInArr);

module.exports = router;
