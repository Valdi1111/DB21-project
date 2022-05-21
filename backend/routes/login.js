const express = require('express');
const router = express.Router();
const db = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
        (err, result) => {
// user does not exists
            if (err) {
                throw err;
                return res.status(400).send({
                    msg: err
                });
            }
            if (!result.length) {
                return res.status(401).send({
                    msg: 'Email or password is incorrect!'
                });
            }
// check password
            bcrypt.compare(
                req.body.password,
                result[0]['password'],
                (bErr, bResult) => {
// wrong password
                    if (bErr) {
                        throw bErr;
                        return res.status(401).send({
                            msg: 'Email or password is incorrect!'
                        });
                    }
                    if (bResult) {
                        const token = jwt.sign({id: result[0].id}, 'the-super-strong-secrect', {expiresIn: '1h'});
                        db.query(
                            `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
                        );
                        return res.status(200).send({
                            msg: 'Logged in!',
                            token,
                            user: result[0]
                        });
                    }
                    return res.status(401).send({
                        msg: 'Username or password is incorrect!'
                    });
                }
            );
        }
    );
});

module.exports = router;