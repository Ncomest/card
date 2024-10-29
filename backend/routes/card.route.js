const express = require("express");
const router = express.Router();

const {
 getCards,
 getCardById,
 createCard,
 updateCard,
 deleteCard,
} = require("../controllers/card.controller.js");

const cardRoutes = (DeckModel) => {
 router.get("/", getCards(DeckModel));
 router.get("/:id", getCardById(DeckModel));
 router.post("/", createCard(DeckModel));
 router.put("/:id", updateCard(DeckModel));
 router.delete("/:id", deleteCard(DeckModel));
 return router;
};

module.exports = cardRoutes;
