const express = require("express");
const router = express.Router();

const {
 getDiceRoll,
  updateDiceRoll,
  refreshDiceRoll
} = require("../controllers/dice_roll.controller.js");

router.get("/", getDiceRoll);
router.put("/", updateDiceRoll);
router.put("/refresh", refreshDiceRoll);

module.exports = router;
