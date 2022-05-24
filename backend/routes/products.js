const express = require("express");
const router = express.Router();
const db = require("../models/db");
const response = require("../methods/response");

router.get(
    "/",
    (req, res, next) => {
        let query = `SELECT p.id, p.title, p.description, i.path AS cover, p.price, p.discount 
                        FROM product p LEFT JOIN product_has_image i ON i.product_id = p.id AND i.is_cover = 1 
                        WHERE p.visible = 1`;
        if (req.body.max_price) {
            query += ` AND p.price <= ${db.escape(req.body.max_price)}`;
        }
        if (req.body.min_price) {
            query += ` AND p.price >= ${db.escape(req.body.min_price)}`;
        }
        if (req.body.search) {
            query += ` AND p.title LIKE ${db.escape("%" + req.body.search + "%")}`;
        }
        query += `;`;
        db.query(
            query,
            (err, results, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                return res.json(results);
            }
        );
    }
);

router.get(
    "/:id",
    (req, res, next) => {
        let r = {};
        // search product
        db.query(
            `SELECT * FROM product WHERE id = ${db.escape(req.params.id)};`,
            (err, results, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                // nothing found
                if (!results) {
                    return res.json(r);
                }
                // add product to response
                r.product = results[0];
                // search images
                db.query(
                    `SELECT path, is_cover FROM product_has_image WHERE product_id = ${db.escape(req.params.id)};`,
                    (err, results, fields) => {
                        // db error
                        if (err) {
                            return response.internalError(res, err);
                        }
                        // add images to response
                        r.images = results;
                        // send response
                        return res.json(r);
                    }
                );
            }
        );
    }
);

module.exports = router;