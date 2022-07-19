const express = require("express");
const router = express.Router();

const {tokenCheck, userCheck, buyerCheck, sellerCheck, adminCheck} = require("../methods/token_checker");
const auth = require("./auth_router");
const user = require("./user_router");
const buyer = require("./buyer_router");
const seller = require("./seller_router");
const admin = require("./admin_router");
const categories = require("./categories");
const products = require("./products");

router.use("/auth", auth);
router.use("/user", tokenCheck, userCheck, user);
router.use("/buyer", tokenCheck, buyerCheck, buyer);
router.use("/seller", tokenCheck, sellerCheck, seller);
router.use("/admin", tokenCheck, adminCheck, admin);
router.use("/categories", categories);
router.use("/products", products);

module.exports = router;
