const express = require("express");
const router = express.Router();

const {
 getHandsCard,
 //  addHandsCard,
 updateHandsCard,
 randomHandsCard,
 refreshHandsCard,
 filterHandsCard
} = require("../controllers/hands.controller.js");

router.post("/", getHandsCard);
router.post("/random", randomHandsCard);
// router.post("/add", addHandsCard);
router.put("/update", updateHandsCard);
router.put("/refresh", refreshHandsCard);
router.put("/filter", filterHandsCard);

module.exports = router;
