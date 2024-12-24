const express = require("express");

const {
 getCards,
 getCardById,
 createCard,
 updateCard,
 deleteCard,
 updCardInDB
} = require("../controllers/card.controller.js");

const cardRoutes = (DeckModel) => {
 const router = express.Router();

 router.get("/", getCards(DeckModel));
 router.get("/:id", getCardById(DeckModel));
 router.post("/", createCard(DeckModel));
 router.put("/updallcard", updCardInDB(DeckModel));
 router.put("/:id", updateCard(DeckModel));
 router.delete("/:id", deleteCard(DeckModel));
 
 return router;
};

module.exports = cardRoutes;
