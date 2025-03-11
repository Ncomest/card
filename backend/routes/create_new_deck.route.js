const express = require("express");

const router = express.Router();

const {
  allCards,
  createNewDeck,
  deteleDeck,
} = require("./../controllers/create_new_deck.controller.js");

router.get("/all-cards", allCards); // получить список всех карт
router.post("/create-new-deck", createNewDeck); // создание новой колоды
router.delete("/delete-deck", deteleDeck); // удалить колоду

module.exports = router;
