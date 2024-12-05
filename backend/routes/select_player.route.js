const express = require("express");
const router = express.Router();

const {selectPlayer,refreshPlayer} = require("../controllers/select_player");
const { verifyAccessToken } = require("../constance/token");

router.post("/", selectPlayer);
router.get("/",verifyAccessToken, refreshPlayer);

module.exports = router;