const express = require("express");
const router = express.Router();

const { getHandsCard, addHandsCard, updateHandsCard } = require("../data/hands/hands.js");

router.post("/update", getHandsCard);
router.post("/", addHandsCard);
router.put("/", updateHandsCard);

module.exports = router;
