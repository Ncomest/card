const express = require("express");
const router = express.Router();

const {
 getDiceRoll,
 updateDiceRoll,
 refreshDiceRoll,
 diceWait,
} = require("../controllers/dice_roll.controller.js");

router.get("/wait", diceWait);
router.get("/", getDiceRoll);
router.put("/", updateDiceRoll);
router.put("/refresh", refreshDiceRoll);

module.exports = router;
