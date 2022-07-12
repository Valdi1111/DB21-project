const express = require("express");
const router = express.Router();
const address = require("../services/address");
const auth = require("../services/auth");
const response = require("../methods/response");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/*
router.post(
    "/signin",
    (req, res, next) => {
        db.query(
            `SELECT *
             FROM user
             WHERE email = ${db.escape(req.body.email)};`,
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
                        const token = jwt.sign({id: result[0].id}, process.env.SECRET, {expiresIn: "30d"});
                        db.query(`UPDATE user
                                  SET last_login = now()
                                  WHERE id = ${result[0].id}`);
                        //return res.json({
                        //    token,
                        //    user: result[0]
                        //});
                        return res.json({id: result[0].id, type: result[0].type, token});
                    }
                );
            }
        );
    }
);
*/

/*
router.post(
    "/signup",
    (req, res, next) => {
        db.query(
            `SELECT *
             FROM user
             WHERE LOWER(email) = LOWER(${db.escape(req.body.email)});`,
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
                        `INSERT INTO user (name, email, password)
                         VALUES ('${req.body.name}', ${db.escape(req.body.email)}, ${db.escape(hash)})`,
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
*/

router.post(
    "/login",
    async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const results = await auth.getUserByEmail(email);
            if (!results.length) {
                // unauthorized - user does not exists
                return response.unauthorized(res, "email_not_found", "Email or password is incorrect!");
            }
            // check password
            const match = await bcrypt.compareSync(password, results[0].password);
            if(!match) {
                // unauthorized - wrong password
                return response.unauthorized(res, "wrong_password", "Email or password is incorrect!");
            }
            const token = jwt.sign({id: results[0].id}, process.env.SECRET, {expiresIn: "30d"});
            await auth.updateLastLogin(results[0].id);
            return res.json({id: results[0].id, type: results[0].type, token});
        } catch (err) {
            console.error("Error on POST auth/login.");
            next(err);
        }
    }
);

router.post(
    "/register",
    async (req, res, next) => {
        try {
            const {type, username, email, password} = req.body;
            const {street, civic_number, postal_code, city, district} = req.body;
            const r1 = await auth.getUserByEmail(email);
            if (r1.length) {
                // email is already registered
                return response.conflict(res, "already_registered", "This email is already in use!");
            }
            const r2 = await auth.getUserByUsername(username);
            if (r2.length) {
                // username is already registered
                return response.conflict(res, "already_registered", "This username is already in use!");
            }
            const hash = await bcrypt.hashSync(password, 10);
            const addressRes = await address.add(street, civic_number, postal_code, city, district);
            if (!addressRes.insertId) {
                // error creating address
                return response.internalError(res, "Error creating address!");
            }
            const userRes = await auth.createUser(type, username, email, hash, addressRes[0].insertId);
            if (!userRes.insertId) {
                // error creating user
                return response.internalError(res, "Error creating user!");
            }
            if(type === "buyer") {
                const {name, surname, fiscal_code, gender} = req.body;
                await auth.createBuyer(userRes[0].insertId, name, surname, fiscal_code, gender);
            }
            if(type === "seller") {
                const {name, vat} = req.body;
                await auth.createSeller(userRes[0].insertId, name, vat);
            }
            // created
            return res.status(201).send({
                success: "The user has been registered with us!"
            });
        } catch (err) {
            console.error("Error on POST auth/register.");
            next(err);
        }
    }
);

module.exports = router;
