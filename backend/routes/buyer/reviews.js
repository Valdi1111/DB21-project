const express = require("express");
const router = express.Router();
const db = require("../../models/db");
const response = require("../../methods/response");
const path = require("path");
const multer = require("multer");

router.post(
    "/",
    multer({dest: "./uploads/reviews/"}).single("image"),
    (req, res, next) => {
        const {title, description, rating, product} = req.body;
        if(req.file) {
            return handleWithImage(req, res, next, title, description, rating, product);
        }
        return handleWithoutImage(req, res, next, title, description, rating, product);
    }
);

function handleWithoutImage(req, res, next, title, description, rating, product) {
    // add review to a product
    db.query(
        `INSERT INTO product_has_review (title, description, rating, product_id, reviewer_id)
         VALUES (${db.escape(title)}, ${db.escape(description)}, ${db.escape(rating)}, ${db.escape(product)},
                 ${db.escape(req.user_id)});`,
        (err, results, fields) => {
            // db error
            if (err) {
                return response.internalError(res, err);
            }
            // send response
            return res.send();
        }
    );
}

function handleWithImage(req, res, next, title, description, rating, product) {
    const image = req.file.filename;
    const ext = path.extname(req.file.originalname).toLowerCase();
    if (!(ext === ".png" || ext === ".jpg" || ext === ".jpeg")) {
        return response.badRequest(res, "invalid_image", "The image provided is invalid!");
    }
    // add review to a product
    db.query(
        `INSERT INTO product_has_review (title, description, image, rating, product_id, reviewer_id)
         VALUES (${db.escape(title)}, ${db.escape(description)}, ${db.escape(image)}, ${db.escape(rating)},
                 ${db.escape(product)}, ${db.escape(req.user_id)});`,
        (err, results, fields) => {
            // db error
            if (err) {
                return response.internalError(res, err);
            }
            // send response
            return res.send();
        }
    );
}

router.get(
    "/:id/helpful",
    (req, res, next) => {
        const {id} = req.params;
        // get review helpful status
        db.query(
            `SELECT r.id, CASE WHEN up.review_id IS NULL THEN FALSE ELSE TRUE END AS helpful
             FROM product_has_review r
                      LEFT JOIN product_review_upvote up ON r.id = up.review_id AND up.upvoter_id = ${db.escape(req.user_id)}
             WHERE r.id = ${db.escape(id)};`,
            (err, results, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                // nothing found
                if (!results.length) {
                    return response.notFound(res, "review_not_found", "No review found with id " + id + "!");
                }
                // send response
                return res.json(results[0]);
            }
        );
    }
);

router.post(
    "/:id/helpful",
    (req, res, next) => {
        const {id} = req.params;
        // set review as helpful
        db.query(
            `INSERT IGNORE INTO product_review_upvote (review_id, upvoter_id)
             VALUES (${db.escape(id)}, ${db.escape(req.user_id)});`,
            (err, results, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                // send response
                return res.send();
            }
        );
    }
);

router.delete(
    "/:id/helpful",
    (req, res, next) => {
        const {id} = req.params;
        // set review as not helpful
        db.query(
            `DELETE
             FROM product_review_upvote
             WHERE review_id = ${db.escape(id)}
               AND upvoter_id = ${db.escape(req.user_id)};`,
            (err, results, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                // send response
                return res.send();
            }
        );
    }
);

module.exports = router;