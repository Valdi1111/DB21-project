const express = require("express");
const router = express.Router();

const profile = require("./seller/profile");

router.get("/profile", profile);

module.exports = router;
