const db = require("../models/db");
const jwt = require("jsonwebtoken");
const response = require("./response");

exports.tokenCheck = function (req, res, next) {
    let token = req.headers["x-access-token"];
    if (!token) {
        return response.forbidden(res, "invalid_token", "No token provided!");
    }
    jwt.verify(
        token,
        process.env.SECRET,
        (err, result) => {
            if (err) {
                return response.forbidden(res, "invalid_token", "No token provided!");
            }
            req.token = token;
            req.user_id = result.id;
            next();
        }
    )
}

exports.buyerCheck = function (req, res, next) {
    db.query(
        `SELECT * FROM user INNER JOIN buyer ON user.id = buyer.id WHERE user.id = ${db.escape(req.user_id)};`,
        (err, result, fields) => {
            if (err) {
                return response.internalError(res, err);
            }
            if (!result.length) {
                return response.forbidden(res, "wrong_token", "You are not a buyer!");
            }
            req.buyer = result[0];
            next();
        }
    );
}

exports.sellerCheck = function (req, res, next) {
    db.query(
        `SELECT * FROM user INNER JOIN seller ON user.id = seller.id WHERE user.id = ${db.escape(req.user_id)};`,
        (err, result, fields) => {
            if (err) {
                return response.internalError(res, err);
            }
            if (!result.length) {
                return response.forbidden(res, "wrong_token", "You are not a seller!");
            }
            req.seller = result[0];
            next();
        }
    );
}
