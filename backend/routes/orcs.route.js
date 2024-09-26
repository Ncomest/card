const express = require("express");
const router = express.Router();
const Orc = require("../models/orc.model");

const {
 getProducts,
 getProductById,
 createProduct,
 updateProduct,
 deleteProduct,
} = require("../controllers/product.controller.js");

router.get("/", getProducts(Orc));
router.get("/:id", getProductById(Orc));
router.post("/", createProduct(Orc));
router.put("/:id", updateProduct(Orc));
router.delete("/:id", deleteProduct(Orc));

module.exports = router;
