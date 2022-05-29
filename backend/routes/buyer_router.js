const express = require("express");
const router = express.Router();

const profile = require("./buyer/profile");
const cart = require("./buyer/cart");
const reviews = require("./buyer/reviews");
const faqs = require("./buyer/faqs");

router.use("/settings", profile);
router.use("/cart", cart);
router.use("/reviews", reviews);
router.use("/faqs", faqs);

module.exports = router;
