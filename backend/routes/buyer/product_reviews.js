const express = require("express");
const router = express.Router();
const db = require("../../models/db");
const response = require("../../methods/response");

router.post(
    "/:id/helpful",
    (req, res, next) => {
        // set review as helpful
        db.query(
            `INSERT IGNORE INTO product_review_upvote (review_id, upvoter_id)
                VALUES (${db.escape(req.params.id)}, ${db.escape(req.user_id)});`,
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

router.delete(
    "/:id/helpful",
    (req, res, next) => {
        // set review as not helpful
        db.query(
            `DELETE FROM product_review_upvote
                WHERE review_id = ${db.escape(req.params.id)} AND upvoter_id = ${db.escape(req.user_id)};`,
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