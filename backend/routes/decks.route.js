const express = require("express");
const router = express.Router();

const {getAllDecks} = require('../controllers/decks.controller')

router.get('/', getAllDecks)


module.exports = router