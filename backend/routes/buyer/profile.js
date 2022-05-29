const express = require("express");
const router = express.Router();
const db = require("../../models/db");
const response = require("../../methods/response");

router.get(
    "/",
    (req, res, next) => {
        // search settings data
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

module.exports = router;