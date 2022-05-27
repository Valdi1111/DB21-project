const express = require("express");
const router = express.Router();

const profile = require("./buyer/profile");
const productReviews = require("./buyer/product_reviews");
const productFaqs = require("./buyer/product_faqs");

router.get("/profile", profile);
router.use("/reviews", productReviews);
router.use("/faqs", productFaqs);

module.exports = router;
