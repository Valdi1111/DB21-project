const express = require("express");
const router = express.Router();
const db = require("../models/db");
const response = require("../methods/response");

router.get(
    "/",
    (req, res, next) => {
        const {category, max_price, min_price, search} = req.query;
        const limit = req.query.limit && !isNaN(req.query.limit) ? req.query.limit : 12;
        const offset = req.query.offset && !isNaN(req.query.offset) ? req.query.offset : 0;
        let query = `SELECT DISTINCT p.id,
                                     p.title,
                                     p.description,
                                     p.price,
                                     p.discount,
                                     (SELECT pi.path
                                      FROM product_has_image pi
                                      WHERE pi.product_id = p.id
                                      ORDER BY pi.order ASC LIMIT 1) AS cover
                     FROM product p LEFT JOIN product_has_category c
                     ON c.product_id = p.id
                     WHERE p.visible = 1`;
        if (category) {
            query += ` AND c.category_id = ${db.escape(category)}`;
        }
        if (max_price) {
            query += ` AND p.price <= ${db.escape(max_price)}`;
        }
        if (min_price) {
            query += ` AND p.price >= ${db.escape(min_price)}`;
        }
        if (search) {
            query += ` AND p.title LIKE ${db.escape("%" + search + "%")}`;
        }
        query += ` LIMIT ${limit} OFFSET ${offset};`;
        db.query(
            query,
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
    "/:id",
    (req, res, next) => {
        const {id} = req.params;
        // search product
        db.query(
            `SELECT p.id,
                    p.title,
                    p.description_full AS description,
                    p.price,
                    p.amount,
                    p.discount,
                    p.seller_id,
                    s.name             AS business_name,
                    p.visible
             FROM product p
                      LEFT JOIN seller s ON s.id = p.seller_id
             WHERE p.id = ${db.escape(id)};`,
            (err, results, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                // nothing found
                if (!results.length) {
                    return response.notFound(res, "product_not_found", "No product found with id " + id + "!");
                }
                if (!results[0].visible) {
                    return response.notFound(res, "product_not_available", "Product with id " + id + " isn't available right now!");
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
        const {id} = req.params;
        // search images
        db.query(
            `SELECT i.path, i.order
             FROM product_has_image i
             WHERE i.product_id = ${db.escape(id)}
             ORDER BY i.order ASC;`,
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
    "/:id/faqs",
    (req, res, next) => {
        const {id} = req.params;
        // search faqs
        db.query(
            `SELECT q.id, q.question, q.answer, q.created, SUM(IFNULL(up.vote, 0)) AS upvotes
             FROM product_has_faq q
                      LEFT JOIN product_faq_upvote up ON q.id = up.faq_id
             WHERE q.product_id = ${db.escape(id)}
               AND q.answer IS NOT NULL
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

router.get(
    "/:id/ratings",
    (req, res, next) => {
        const {id} = req.params;
        let r = {};
        // search reviews rating avg
        db.query(
            `SELECT AVG(rating) AS average, COUNT(*) AS amount
             FROM product_has_review r
             WHERE r.product_id = ${db.escape(id)}
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
                db.query(
                    `SELECT r.rating, COUNT(*) AS amount
                     FROM product_has_review r
                     WHERE r.product_id = ${db.escape(id)}
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
    (req, res, next) => {
        const {id} = req.params;
        const {order_by} = req.query;
        let order_type;
        if (order_by === "date") {
            order_type = "r.created";
        }
        if (order_by === "helpful") {
            order_type = "upvotes";
        }
        if (!order_type) {
            return response.badRequest(res, "invalid_parameter", "Parameter order_by is invalid!");
        }
        // search reviews
        db.query(
            `SELECT r.id,
                    r.reviewer_id,
                    u.avatar,
                    u.username,
                    r.created,
                    r.rating,
                    r.title,
                    r.description,
                    r.image,
                    COUNT(up.review_id) AS upvotes
             FROM product_has_review r
                      INNER JOIN user u ON r.reviewer_id = u.id
                      LEFT JOIN product_review_upvote up ON r.id = up.review_id
             WHERE r.product_id = ${db.escape(id)}
             GROUP BY r.id
             ORDER BY ${order_type} DESC;`,
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