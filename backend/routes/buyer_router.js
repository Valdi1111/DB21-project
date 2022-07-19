const express = require("express");
const router = express.Router();

const profile = require("./buyer/profile");
const shipments = require("./buyer/shipments");
const payments = require("./buyer/payments");
const cart = require("./buyer/cart");
const checkout = require("./buyer/checkout");
const orders = require("./buyer/orders");
const products = require("./buyer/products");
const chat = require("./buyer/chat");

router.use("/profile", profile);
router.use("/shipments", shipments);
router.use("/payments", payments);
router.use("/cart", cart);
router.use("/checkout", checkout);
router.use("/orders", orders);
router.use("/products", products);
router.use("/chat", chat);

module.exports = router;
