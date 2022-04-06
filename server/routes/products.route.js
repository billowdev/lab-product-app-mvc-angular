const express = require("express");
const router = express.Router();

const {
	getAllProducts,
	createProduct,
	updateProduct,
	deleteProduct
  } = require("../controllers/products.controllers");

router.get("/get", getAllProducts);
router.post("/create", createProduct);
router.patch("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
