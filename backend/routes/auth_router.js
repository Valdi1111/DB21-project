const express = require("express");
const router = express.Router();
const db = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const response = require("../methods/response");

router.post(
    "/signin",
    (req, res, next) => {
        db.query(
            `SELECT * FROM user WHERE email = ${db.escape(req.body.email)};`,
            (err, result) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                // unauthorized - user does not exists
                if (!result.length) {
                    return response.unauthorized(res, "email_not_found", "Email or password is incorrect!");
                }
                // check password
                bcrypt.compare(
                    req.body.password,
                    result[0]["password"],
                    (bErr, bResult) => {
                        // error
                        if (bErr) {
                            return response.internalError(res, err);
                        }
                        // unauthorized - wrong password
                        if (!bResult) {
                            return response.unauthorized(res, "wrong_password", "Email or password is incorrect!");
                        }
                        const token = jwt.sign({id: result[0].id}, process.env.SECRET, {expiresIn: "1h"});
                        db.query(`UPDATE user SET last_login = now() WHERE id = ${result[0].id}`);
                        return res.json({
                            token,
                            user: result[0]
                        });
                    }
                );
            }
        );
    }
);

router.post(
    "/signup",
    (req, res, next) => {
        db.query(
            `SELECT * FROM user WHERE LOWER(email) = LOWER(${db.escape(req.body.email)});`,
            (err, result) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                // email is already registered
                if (result.length) {
                    return res.status(409).send({
                        error: "already_registered",
                        message: "This email is already in use!"
                    });
                }
                // username is available
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    // hash error
                    if (err) {
                        return response.internalError(res, err);
                    }
                    // has hashed pw => add to database
                    db.query(
                        `INSERT INTO user (name, email, password) VALUES ('${req.body.name}', ${db.escape(req.body.email)}, ${db.escape(hash)})`,
                        (err, result) => {
                            // db error
                            if (err) {
                                return response.internalError(res, err);
                            }
                            // created
                            return res.status(201).send({
                                success: "The user has been registered with us!"
                            });
                        }
                    );
                });
            }
        );
    }
);

module.exports = router;