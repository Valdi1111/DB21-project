const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get(
    '/',
    (req, res, next) => {
        db.query(
            `SELECT * FROM category;`,
            (error, results, fields) => {
                // error
                if (error) {
                    //throw err;
                    return res.status(400).send({
                        msg: error
                    });
                }
                return res.json(results);
            }
        );
    }
);

module.exports = router;