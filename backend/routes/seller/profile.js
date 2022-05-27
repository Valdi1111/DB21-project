const db = require("../../models/db");
const response = require("../../methods/response");

function profile(req, res, next) {
    // search profile data
    db.query(
        `SELECT * 
            FROM user u INNER JOIN seller s ON u.id = s.id 
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

module.exports = profile;