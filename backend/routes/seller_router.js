const express = require("express");
const router = express.Router();

const profile = require("./seller/profile");
const products = require("./seller/products");

router.use("/profile", profile);
router.use("/products", products);

module.exports = router;
