const express = require("express");
const { verifyAccessToken } = require("../constance/token.js");

const router = express.Router();

const { login, logout, check } = require("../controllers/auth.controller.js");
// const { refreshAccessToken } = require("../constance/token.js");

router.post("/login", login);
router.post("/logout", logout);
router.get("/check", verifyAccessToken, check);
// router.post("/refresh-token", refreshAccessToken);

module.exports = router;
