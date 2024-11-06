const express = require("express");
const router = express.Router();

const {selectPlayer,refreshPlayer} = require("../controllers/select_player");

router.post("/", selectPlayer);
router.get("/", refreshPlayer);

module.exports = router;