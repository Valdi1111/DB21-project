const express = require("express");
const router = express.Router();

const profile = require("./seller/profile");
const products = require("./seller/products");
const chat = require("./seller/chat");

router.use("/profile", profile);
router.use("/products", products);
router.use("/chat", chat);

module.exports = router;
