const express = require("express");
const router = express.Router();
const db = require("../../models/db");
const response = require("../../methods/response");

router.get(
    "/",
    (req, res, next) => {
        // search shipments data
        db.query(
            `SELECT a.id, a.street, a.civic_number, a.postal_code, a.city, a.district, s.name
             FROM address a
                      INNER JOIN shipment s on a.id = s.id
             WHERE s.buyer_id = ${db.escape(req.user_id)}
               AND s.visible = 1;`,
            (err, result, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                // send response
                return res.json(result);
            }
        );
    }
);

router.post(
    "/",
    (req, res, next) => {
        const {name, street, civic_number, postal_code, city, district} = req.body;
        // add address
        db.query(
            `INSERT INTO address (street, civic_number, postal_code, city, district)
             VALUES (${db.escape(street)}, ${db.escape(civic_number)}, ${db.escape(postal_code)}, ${db.escape(city)},
                     ${db.escape(district)});`,
            (err, result, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                const id = result.insertId;
                // add shipment
                db.query(
                    `INSERT INTO shipment (id, buyer_id, name)
                     VALUES (${db.escape(id)}, ${db.escape(req.user_id)}, ${db.escape(name)});`,
                    (err, result, fields) => {
                        // db error
                        if (err) {
                            return response.internalError(res, err);
                        }
                        // send response
                        return res.json({id: id});
                    }
                );
            }
        );
    }
);

router.delete(
    "/:id",
    (req, res, next) => {
        const {id} = req.params;
        // delete shipment
        db.query(
            `UPDATE shipment s
             SET s.visible = 0
             WHERE s.id = ${db.escape(id)}
               AND s.buyer_id = ${db.escape(req.user_id)};`,
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