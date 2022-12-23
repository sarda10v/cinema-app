const { Router } = require('express');
const router = Router();

router.use(require("./cinema.route"))
router.use(require("./actor.route"))
router.use(require("./genre.route"))
router.use(require("./review.route"))
router.use(require("./tag.route"))
router.use(require("./user.route"))


module.exports = router;