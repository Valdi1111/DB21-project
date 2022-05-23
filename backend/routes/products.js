const express = require("express");
const router = express.Router();
const db = require("../models/db");
const response = require("../methods/response");

router.get(
    "/",
    (req, res, next) => {
        db.query(
            `SELECT id, title, description, image, price FROM product;`,
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

router.get(
    "/:id",
    (req, res, next) => {
        db.query(
            `SELECT * FROM product WHERE id = ${db.escape(req.params.id)};`,
            (err, results, fields) => {
                // db error
                if (err) {
                    return response.internalError();
                }
                return res.json(results[0]);
            }
        );
    }
);

module.exports = router;