const express = require("express");
const router = express.Router();
const categories = require("../services/categories");

router.get(
    "/",
    async (req, res, next) => {
        try {
            return res.json(await categories.getAll());
        } catch (err) {
            console.error("Error on GET categories.");
            next(err);
        }
    }
);

module.exports = router;
