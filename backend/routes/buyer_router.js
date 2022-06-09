const express = require("express");
const router = express.Router();

const profile = require("./buyer/profile");
const shipments = require("./buyer/shipments");
const cart = require("./buyer/cart");
const reviews = require("./buyer/reviews");
const faqs = require("./buyer/faqs");

router.use("/profile", profile);
router.use("/shipments", shipments);
router.use("/cart", cart);
router.use("/reviews", reviews);
router.use("/faqs", faqs);

module.exports = router;
