const express = require("express");
const router = express.Router();
const Orc = require("../models/orc.model");

const {
 getCards,
 getCardById,
 createCard,
 updateCard,
 deleteCard,
} = require("../controllers/card.controller.js");

router.get("/", getCards(Orc));
router.get("/:id", getCardById(Orc));
router.post("/", createCard(Orc));
router.put("/:id", updateCard(Orc));
router.delete("/:id", deleteCard(Orc));

module.exports = router;
