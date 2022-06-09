const express = require("express");
const router = express.Router();
const db = require("../../models/db");
const response = require("../../methods/response");

router.get(
    "/",
    (req, res, next) => {
        // search seller data
        db.query(
            `SELECT *
             FROM user u
                      INNER JOIN seller s ON u.id = s.id
             WHERE u.id = ${db.escape(req.user_id)};`,
            (err, result, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                // send response
                return res.json(result[0]);
            }
        );
    }
);

router.put(
    "/",
    (req, res, next) => {
        // edit seller data
        db.query(
            `UPDATE seller s
             SET s.name = ${db.escape(req.body.name)},
                 s.vat  = ${db.escape(req.body.vat)}
             WHERE s.id = ${db.escape(req.user_id)};`,
            (err, result, fields) => {
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