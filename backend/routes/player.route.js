const express = require("express");
const router = express.Router();

const {player} = require("../data/player/player.js");

router.get("/", player);

module.exports = router;