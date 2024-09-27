const express = require("express");
const router = express.Router();

const { getHandsCard, addHandsCard } = require("../data/hands/hands.js");

router.get("/", getHandsCard);
router.post("/", addHandsCard);

module.exports = router;
