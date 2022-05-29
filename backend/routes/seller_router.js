const express = require("express");
const router = express.Router();

const profile = require("./seller/profile");

router.use("/settings", profile);

module.exports = router;
