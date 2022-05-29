const db = require("../../models/db");
const response = require("../../methods/response");

function data(req, res, next) {
    // search user data
    db.query(
        `SELECT u.id, u.type, u.username, u.email, u.avatar
         FROM user u
         WHERE u.id = ${db.escape(req.user_id)};`,
        (err, result, fields) => {
            // db error
            if (err) {
                return response.internalError(res, err);
            }
            // send response
            return res.json(result[0]);
        }
    );
}

module.exports = data;