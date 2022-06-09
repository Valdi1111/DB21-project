const express = require("express");
const router = express.Router();
const db = require("../../models/db");
const response = require("../../methods/response");

router.get(
    "/",
    (req, res, next) => {
        // get cart products
        db.query(
            `SELECT c.buyer_id,
                    c.product_id,
                    c.amount,
                    p.id,
                    p.title,
                    p.amount AS max_amount,
                    p.price,
                    p.discount
             FROM cart c
                      INNER JOIN product p ON c.product_id = p.id
             WHERE c.buyer_id = ${db.escape(req.user_id)};`,
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

router.post(
    "/",
    (req, res, next) => {
        const {product, amount} = req.body;
        // add product amount in cart or add amount if already present
        db.query(
            `INSERT INTO cart (buyer_id, product_id, amount)
             VALUES (${db.escape(req.user_id)}, ${db.escape(product)}, ${db.escape(amount)})
             ON DUPLICATE KEY UPDATE amount = amount + ${db.escape(amount)};`,
            (err, results, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                // send response
                return res.send();
            }
        );
    }
);

router.put(
    "/",
    (req, res, next) => {
        const {product, amount} = req.body;
        // edit product amount in cart or set amount if already present
        db.query(
            `INSERT INTO cart (buyer_id, product_id, amount)
             VALUES (${db.escape(req.user_id)}, ${db.escape(product)}, ${db.escape(amount)})
             ON DUPLICATE KEY UPDATE amount = ${db.escape(amount)};`,
            (err, results, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                // send response
                return res.send();
            }
        );
    }
);

router.delete(
    "/",
    (req, res, next) => {
        const {product} = req.body;
        // remove product from cart
        db.query(
            `DELETE
             FROM cart c
             WHERE c.buyer_id = ${db.escape(req.user_id)}
               AND c.product_id = ${db.escape(product)};`,
            (err, results, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                // send response
                return res.send();
            }
        );
    }
);

module.exports = router;