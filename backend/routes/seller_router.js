const express = require("express");
const router = express.Router();

const profile = require("./seller/profile");
const products = require("./seller/products");
const faqs = require("./seller/faqs");

router.use("/profile", profile);
router.use("/products", products);
router.use("/faqs", faqs);

module.exports = router;
