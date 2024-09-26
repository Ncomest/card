const express = require("express");
const router = express.Router();

const { getHandsCard, addHandsCard } = require("../data/hands/hands");

router.get("/", getHandsCard);
router.post("/", addHandsCard);

module.exports = router;
