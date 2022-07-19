const express = require("express");
const router = express.Router();
const address = require("../services/address");
const auth = require("../services/auth");
const response = require("../methods/response");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
            const userRes = await auth.createUser(type, username, email, hash, addressRes.insertId);
            if (!userRes.insertId) {
                // error creating user
                return response.internalError(res, "Error creating user!");
            }
            if(type === "buyer") {
                const {name, surname, fiscal_code, gender} = req.body;
                await auth.createBuyer(userRes.insertId, name, surname, fiscal_code, gender);
            }
            if(type === "seller") {
                const {name, vat} = req.body;
                await auth.createSeller(userRes.insertId, name, vat);
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
