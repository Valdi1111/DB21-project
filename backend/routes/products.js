const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get(
    '/',
    (req, res, next) => {
        db.query(
            `SELECT id, title, description, image, price, amount FROM product;`,
            (error, results, fields) => {
                // error
                if (error) {
                    //throw err;
                    return res.status(400).send({
                        error: error
                    });
                }
                return res.json({error: false, data: results});
            }
        );
    }
);

router.get(
    '/:id',
    (req, res, next) => {
        db.query(
            `SELECT * FROM product WHERE id = ${db.escape(req.params.id)};`,
            (error, results, fields) => {
                // error
                if (error) {
                    //throw err;
                    return res.status(400).send({
                        error: error
                    });
                }
                return res.json({error: false, data: results[0]});
            }
        );
    }
);

module.exports = router;