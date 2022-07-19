const express = require("express");
const router = express.Router();

const orders = require("./admin/orders");

router.use("/orders", orders);

module.exports = router;
