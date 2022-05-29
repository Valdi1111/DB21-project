const express = require("express");
const router = express.Router();

const data = require("./user/data");
const notifications = require("./user/notifications");

router.get("/data", data);
router.use("/notifications", notifications);

module.exports = router;
