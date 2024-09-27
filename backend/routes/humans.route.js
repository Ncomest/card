const express = require("express");
const router = express.Router();
const Human = require("../models/human.model.js");

const {
 getCards,
 getCardById,
 createCard,
 updateCard,
 deleteCard,
} = require("../controllers/card.controller.js");

router.get("/", getCards(Human));
router.get("/:id", getCardById(Human));
router.post("/", createCard(Human));
router.put("/:id", updateCard(Human));
router.delete("/:id", deleteCard(Human));

module.exports = router;
