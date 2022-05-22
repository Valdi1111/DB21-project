const express = require('express');
const router = express.Router();
const db = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signin', (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
        (err, result) => {
// user does not exists
            if (err) {
                //throw err;
                return res.status(400).json({
                    msg: err
                });
            }
            if (!result.length) {
                return res.status(401).json({
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
                        //throw bErr;
                        return res.status(401).json({
                            msg: 'Email or password is incorrect!'
                        });
                    }
                    if (bResult) {
                        const token = jwt.sign({id: result[0].id}, 'the-super-strong-secrect', {expiresIn: '1h'});
                        db.query(
                            `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
                        );
                        return res.status(200).json({
                            msg: 'Logged in!',
                            token,
                            user: result[0]
                        });
                    }
                    return res.status(401).json({
                        msg: 'Username or password is incorrect!'
                    });
                }
            );
        }
    );
});

router.post('/signup', (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(req.body.email)});`,
        (err, result) => {
            if (result.length) {
                return res.status(409).send({
                    msg: 'This user is already in use!'
                });
            } else {
// username is available
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            msg: err
                        });
                    } else {
// has hashed pw => add to database
                        db.query(
                            `INSERT INTO users (name, email, password) VALUES ('${req.body.name}', ${db.escape(req.body.email)}, ${db.escape(hash)})`,
                            (err, result) => {
                                if (err) {
                                    throw err;
                                    return res.status(400).send({
                                        msg: err
                                    });
                                }
                                return res.status(201).send({
                                    msg: 'The user has been registered with us!'
                                });
                            }
                        );
                    }
                });
            }
        }
    );
});

module.exports = router;