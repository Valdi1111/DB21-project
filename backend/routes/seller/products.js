const express = require("express");
const router = express.Router();
const db = require("../../models/db");
const response = require("../../methods/response");

router.get(
    "/",
    (req, res, next) => {
        const {search} = req.query;
        const limit = req.query.limit ? req.query.limit : 12;
        const offset = req.query.offset ? req.query.offset : 0;
        let query = `SELECT DISTINCT p.id,
                                     p.title,
                                     p.description,
                                     p.price,
                                     p.discount,
                                     (SELECT pi.path
                                      FROM product_has_image pi
                                      WHERE pi.product_id = p.id
                                      ORDER BY pi.order ASC
                                      LIMIT 1) AS cover
                     FROM product p
                     WHERE p.seller_id = ${db.escape(req.user_id)}`;
        if (search) {
            query += ` AND p.title LIKE ${db.escape("%" + search + "%")}`;
        }
        query += ` LIMIT ${limit} OFFSET ${offset};`;
        db.query(
            query,
            (err, results, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                // send response
                return res.json(results);
            }
        );
    }
);

module.exports = router;