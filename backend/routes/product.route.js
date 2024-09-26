const express = require("express");
const router = express.Router();
const Product = require("../models/product.model.js");

const {
 getProducts,
 getProductById,
 createProduct,
 updateProduct,
 deleteProduct,
} = require("../controllers/product.controller.js");

router.get("/", getProducts(Product));
router.get("/:id", getProductById(Product));
router.post("/", createProduct(Product));
router.put("/:id", updateProduct(Product));
router.delete("/:id", deleteProduct(Product));

module.exports = router;
