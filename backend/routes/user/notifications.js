const express = require("express");
const router = express.Router();
const db = require("../../models/db");
const response = require("../../methods/response");

router.get(
    "/",
    (req, res, next) => {
        // get unread notifications
        db.query(
            `SELECT n.id, n.title, n.description, n.link, n.created
             FROM notification n
                      INNER JOIN user_has_notification uhn on n.id = uhn.notification_id
             WHERE uhn.user_id = ${db.escape(req.user_id)}
               AND uhn.read = 0
             ORDER BY n.created DESC;`,
            (err, results, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                // send response
                return res.send(results);
            }
        );
    }
);

router.get(
    "/history",
    (req, res, next) => {
        // get all notifications
        db.query(
            `SELECT n.id, n.title, n.description, n.link, n.created, uhn.read
             FROM notification n
                      INNER JOIN user_has_notification uhn on n.id = uhn.notification_id
             WHERE uhn.user_id = ${db.escape(req.user_id)}
               AND uhn.read = 1
             ORDER BY n.created DESC;`,
            (err, results, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                // send response
                return res.send(results);
            }
        );
    }
);

router.post(
    "/:id/read",
    (req, res, next) => {
        const {id} = req.params;
        // get unread notifications
        db.query(
            `UPDATE user_has_notification uhn
             SET uhn.read = 1
             WHERE uhn.user_id = ${req.user_id}
               AND uhn.notification_id = ${db.escape(id)};`,
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