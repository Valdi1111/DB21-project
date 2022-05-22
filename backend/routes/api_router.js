const express = require('express');
const router = express.Router();

const authRouter = require('./auth_router');
const categoriesRouter = require("./categories");
const productsRouter = require("./products");

router.use("/auth", authRouter);
router.use("/categories", categoriesRouter);
router.use("/products", productsRouter);

module.exports = router;