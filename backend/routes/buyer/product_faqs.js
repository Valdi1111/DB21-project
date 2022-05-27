const express = require("express");
const router = express.Router();
const db = require("../../models/db");
const response = require("../../methods/response");

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
                return res.json(results);
            }
        );
    }
);

module.exports = router;