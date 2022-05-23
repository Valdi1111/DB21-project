const express = require("express");
const router = express.Router();

router.get(
    "/profile",
    (req, res, next) => {
        res.json(req.buyer);
    }
);

module.exports = router;
