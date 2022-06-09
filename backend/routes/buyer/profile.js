const express = require("express");
const router = express.Router();
const db = require("../../models/db");
const response = require("../../methods/response");

router.get(
    "/",
    (req, res, next) => {
        // search buyer data
        db.query(
            `SELECT *
             FROM user u
                      INNER JOIN buyer b ON u.id = b.id
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
        // edit buyer data
        db.query(
            `UPDATE buyer b
             SET b.name        = ${db.escape(req.body.name)},
                 b.surname     = ${db.escape(req.body.surname)},
                 b.fiscal_code = ${db.escape(req.body.fiscal_code)},
                 b.gender      = ${db.escape(req.body.gender)}
             WHERE b.id = ${db.escape(req.user_id)};`,
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