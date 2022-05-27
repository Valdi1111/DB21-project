const express = require("express");
const router = express.Router();
const db = require("../../models/db");
const response = require("../../methods/response");

router.post(
    "/",
    (req, res, next) => {
        const {question, product} = req.body;
        // add faq to a product
        db.query(
            `INSERT INTO product_has_faq (question, product_id)
                VALUES (${db.escape(question)}, ${db.escape(product)})`,
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

router.get(
    "/:id/upvote",
    (req, res, next) => {
        // get faq upvote status
        db.query(
            `SELECT q.id, IFNULL(up.vote, 0) AS upvote
                FROM product_has_faq q 
                    LEFT JOIN product_faq_upvote up ON q.id = up.faq_id AND up.upvoter_id = ${db.escape(req.user_id)}
                WHERE q.id = ${db.escape(req.params.id)};`,
            (err, results, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                // nothing found
                if (!results.length) {
                    return response.notFound(res, "faq_not_found", "No faq found with id " + req.params.id + "!");
                }
                // send response
                return res.json(results[0]);
            }
        );
    }
);

router.post(
    "/:id/upvote",
    (req, res, next) => {
        // change faq upvote status
        db.query(
            `INSERT INTO product_faq_upvote (faq_id, upvoter_id, vote)
                VALUES (${db.escape(req.params.id)}, ${db.escape(req.user_id)}, ${db.escape(req.body.vote)})
                ON DUPLICATE KEY UPDATE vote = ${db.escape(req.body.vote)};`,
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