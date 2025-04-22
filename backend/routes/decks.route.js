const express = require("express");
const router = express.Router();

const { getAllDecks } = require("../controllers/decks.controller");

router.get("/all-deck", getAllDecks);

module.exports = router;
