const express = require("express");
const router = express.Router();
const db = require("../../models/db");
const response = require("../../methods/response");

router.delete(
    "/:id",
    (req, res, next) => {
        const {id} = req.params;
        // delete faq
        db.query(
            `DELETE FROM product_has_faq q
             WHERE q.id = ${db.escape(id)}`,
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
    "/:id",
    (req, res, next) => {
        const {id} = req.params;
        const {answer} = req.body;
        // update faq answer
        db.query(
            `UPDATE product_has_faq q
             SET q.answer = ${db.escape(answer)}
             WHERE q.id = ${db.escape(id)}`,
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