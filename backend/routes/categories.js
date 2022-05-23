const express = require("express");
const router = express.Router();
const db = require("../models/db");
const response = require("../methods/response");

router.get(
    "/",
    (req, res, next) => {
        db.query(
            `SELECT * FROM category;`,
            (err, results, fields) => {
                // db error
                if (err) {
                    return response.internalError();
                }
                return res.json(results);
            }
        );
    }
);

module.exports = router;