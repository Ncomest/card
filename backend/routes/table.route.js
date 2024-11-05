const express = require("express");
const router = express.Router();

const {
 getTableBoxes,
 getTableBox,
 createTableBox,
 updateTableBox,
 updateAllTableBox,
 deleteTableBox,
 longPullingUpdate,
} = require("../controllers/table.controller.js");

router.get("/update", longPullingUpdate);
router.get("/", getTableBoxes);
router.get("/:id", getTableBox);
router.post("/", createTableBox);
router.put("/refstep", updateAllTableBox);
router.put("/:id", updateTableBox);
router.delete("/:id", deleteTableBox);

module.exports = router;
