const express = require("express");
const router = express.Router();
const db = require("../models/db");
const response = require("../methods/response");
const {tryTokenCheck} = require("../methods/token_checker");

router.get(
    "/",
    (req, res, next) => {
        let query = `SELECT p.id, p.title, p.description, i.path AS cover, p.price, p.discount 
                        FROM product p LEFT JOIN product_has_image i ON i.product_id = p.id AND i.is_cover = 1 
                        WHERE p.visible = 1`;
        if (req.body.max_price) {
            query += ` AND p.price <= ${db.escape(req.body.max_price)}`;
        }
        if (req.body.min_price) {
            query += ` AND p.price >= ${db.escape(req.body.min_price)}`;
        }
        if (req.body.search) {
            query += ` AND p.title LIKE ${db.escape("%" + req.body.search + "%")}`;
        }
        query += `;`;
        db.query(
            query,
            (err, results, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                return res.json(results);
            }
        );
    }
);

router.get(
    "/:id",
    (req, res, next) => {
        // search product
        db.query(
            `SELECT * FROM product WHERE id = ${db.escape(req.params.id)};`,
            (err, results, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                // nothing found
                if (!results.length) {
                    return response.notFound(res, "product_not_found", "No product found with id " + req.params.id + "!");
                }
                // send response
                return res.json(results[0]);
            }
        );
    }
);

router.get(
    "/:id/images",
    (req, res, next) => {
        // search images
        db.query(
            `SELECT path, is_cover FROM product_has_image WHERE product_id = ${db.escape(req.params.id)};`,
            (err, results, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                // send response
                return res.json(results);
            }
        );
    }
);

router.get(
    "/:id/ratings",
    (req, res, next) => {
        let r = {};
        // search reviews rating avg
        db.query(`SELECT AVG(rating) AS average, COUNT(*) AS amount
                    FROM product_has_review r
                    WHERE r.product_id = ${db.escape(req.params.id)}
                    GROUP BY r.product_id;`,
            (err, results, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                // add response
                r.average = results[0] ? results[0].average : -1;
                r.amount = results[0] ? results[0].amount : 0;
                // search reviews ratings
                db.query(`SELECT r.rating, COUNT(*) AS amount
                    FROM product_has_review r
                    WHERE r.product_id = ${db.escape(req.params.id)}
                    GROUP BY r.product_id, r.rating
                    ORDER BY r.rating DESC;`,
                    (err, results, fields) => {
                        // db error
                        if (err) {
                            return response.internalError(res, err);
                        }
                        // add response
                        r.ratings = results;
                        // send response
                        return res.json(r);
                    }
                );
            }
        );
    }
);

router.get(
    "/:id/reviews",
    tryTokenCheck,
    (req, res, next) => {
        // search reviews
        db.query(`SELECT r.id, r.reviewer_id, u.avatar, u.username, r.created, r.rating, r.title, r.description, r.image, 
                        CASE WHEN mup.review_id IS NULL THEN FALSE ELSE TRUE END AS upvoted, COUNT(up.review_id) AS upvotes
                    FROM product_has_review r 
                        INNER JOIN user u ON r.reviewer_id = u.id 
                        LEFT JOIN product_review_upvote mup ON r.id = mup.review_id AND mup.upvoter_id = ${db.escape(req.user_id)}
                        LEFT JOIN product_review_upvote up ON r.id = up.review_id
                    WHERE r.product_id = ${db.escape(req.params.id)}
                    GROUP BY r.id
                    ORDER BY upvotes DESC;`,
            (err, results, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                // send response
                return res.json(results);
            }
        );
    }
);

router.get(
    "/:id/faq",
    tryTokenCheck,
    (req, res, next) => {
        // search faq
        db.query(`SELECT q.id, q.question, q.answer, q.created, IFNULL(mup.vote, 0) AS upvoted, SUM(IFNULL(up.vote, 0)) AS upvotes
                    FROM product_has_faq q 
                        LEFT JOIN product_faq_upvote mup ON q.id = mup.faq_id AND mup.upvoter_id = ${db.escape(req.user_id)}
                        LEFT JOIN product_faq_upvote up ON q.id = up.faq_id
                    WHERE q.product_id = ${db.escape(req.params.id)}
                    GROUP BY q.id
                    ORDER BY upvotes DESC;`,
            (err, results, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                // send response
                return res.json(results);
            }
        );
    }
);

module.exports = router;