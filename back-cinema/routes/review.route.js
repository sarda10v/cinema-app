const { Router } = require("express");
const { reviewController } = require("../controllers/review.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/review", reviewController.addReview);
router.delete("/review/:id", reviewController.deleteReviewById);
router.patch("/review/:id", reviewController.editReviewById);
router.get("/review", reviewController.getReviews);

router.get("/review/:id", reviewController.getReviewsByCinema);

router.patch("/review/:id/user", reviewController.addLike);
router.patch("/review/:id/user/remove", reviewController.deleteLike);

module.exports = router;
