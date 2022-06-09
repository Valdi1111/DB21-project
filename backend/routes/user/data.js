const express = require("express");
const router = express.Router();
const db = require("../../models/db");
const response = require("../../methods/response");
const multer = require("multer");
const path = require("path");

router.get(
    "/",
    (req, res, next) => {
        // search user data
        db.query(
            `SELECT u.id, u.type, u.username, u.email, u.avatar
             FROM user u
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
    "/avatar",
    multer({dest: "./uploads/avatars/"}).single("avatar"),
    (req, res, next) => {
        const avatar = req.file.filename;
        const ext = path.extname(req.file.originalname).toLowerCase();
        if (!(ext === ".png" || ext === ".jpg" || ext === ".jpeg")) {
            return response.badRequest(res, "invalid_image", "The image provided is invalid!");
        }
        db.query(
            `UPDATE user u
             SET u.avatar = ${db.escape(avatar)}
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

router.get(
    "/address",
    (req, res, next) => {
        // get address
        db.query(
            `SELECT a.street, a.civic_number, a.postal_code, a.city, a.district
             FROM address a
                      INNER JOIN user u on a.id = u.address_id
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
    "/address",
    (req, res, next) => {
        const {street, civic_number, postal_code, city, district} = req.body;
        // edit address
        db.query(
            `UPDATE address a INNER JOIN user u ON a.id = u.address_id
             SET a.street       = ${db.escape(street)},
                 a.civic_number = ${db.escape(civic_number)},
                 a.postal_code  = ${db.escape(postal_code)},
                 a.city         = ${db.escape(city)},
                 a.district     = ${db.escape(district)}
             WHERE u.id = ${db.escape(req.user_id)};`,
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