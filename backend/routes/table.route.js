const express = require("express");
const router = express.Router();

const {
 getTableBoxes,
 getTableBox,
 createTableBox,
 updateTableBox,
 deleteTableBox,
} = require("../controllers/table.controller.js");

router.get("/", getTableBoxes);
router.get("/:id", getTableBox);
router.post("/", createTableBox);
router.put("/:id", updateTableBox);
router.delete("/:id", deleteTableBox);

module.exports = router;