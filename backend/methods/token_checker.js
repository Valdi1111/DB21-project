const db = require("../services/db");
const jwt = require("jsonwebtoken");
const response = require("./response");

function processToken(req, res, next, forbidden) {
    let token = req.headers["x-access-token"];
    if (!token) {
        if (forbidden) {
            return response.forbidden(res, "invalid_token", "No token provided!");
        }
        req.token = "";
        req.user_id = -1;
        return next();
    }
    jwt.verify(
        token,
        process.env.SECRET,
        (err, result) => {
            if (err) {
                if (forbidden) {
                    return response.forbidden(res, "invalid_token", "No token provided!");
                }
                req.token = "";
                req.user_id = -1;
                return next();
            }
            req.token = token;
            req.user_id = result.id;
            return next();
        }
    )
}

exports.tryTokenCheck = function (req, res, next) {
    processToken(req, res, next, false);
}

exports.tokenCheck = function (req, res, next) {
    processToken(req, res, next, true);
}

exports.userCheck = function (req, res, next) {
    db.query(
        `SELECT *
         FROM user u
         WHERE u.id = ${db.escape(req.user_id)};`,
        (err, result, fields) => {
            if (err) {
                return response.internalError(res, err);
            }
            if (!result.length) {
                return response.forbidden(res, "wrong_token", "You are not a user!");
            }
            next();
        }
    );
}

exports.buyerCheck = function (req, res, next) {
    db.query(
        `SELECT *
         FROM buyer b
         WHERE b.id = ${db.escape(req.user_id)};`,
        (err, result, fields) => {
            if (err) {
                return response.internalError(res, err);
            }
            if (!result.length) {
                return response.forbidden(res, "wrong_token", "You are not a buyer!");
            }
            next();
        }
    );
}

exports.sellerCheck = function (req, res, next) {
    db.query(
        `SELECT *
         FROM seller s
         WHERE s.id = ${db.escape(req.user_id)};`,
        (err, result, fields) => {
            if (err) {
                return response.internalError(res, err);
            }
            if (!result.length) {
                return response.forbidden(res, "wrong_token", "You are not a seller!");
            }
            next();
        }
    );
}

exports.adminCheck = function (req, res, next) {
    db.query(
        `SELECT *
         FROM user u
         WHERE u.id = ${db.escape(req.user_id)}
           AND u.type = 'administrator';`,
        (err, result, fields) => {
            if (err) {
                return response.internalError(res, err);
            }
            if (!result.length) {
                return response.forbidden(res, "wrong_token", "You are not a seller!");
            }
            next();
        }
    );
}
