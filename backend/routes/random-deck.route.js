const express = require("express");
const router = express.Router();
const RandomDeck = require("../models/random-deck.model.js");

const {
 getCards,
 getCardById,
 createCard,
 updateCard,
 deleteCard,
} = require("../controllers/card.controller.js");

router.get("/", getCards(RandomDeck));
router.get("/:id", getCardById(RandomDeck));
router.post("/", createCard(RandomDeck));
router.put("/:id", updateCard(RandomDeck));
router.delete("/:id", deleteCard(RandomDeck));

module.exports = router;
