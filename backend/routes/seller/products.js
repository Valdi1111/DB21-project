const express = require("express");
const router = express.Router();
const db = require("../../models/db");
const response = require("../../methods/response");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

router.get(
    "/",
    (req, res, next) => {
        const {search} = req.query;
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
                                      ORDER BY pi.order ASC
                                      LIMIT 1) AS cover
                     FROM product p
                     WHERE p.seller_id = ${db.escape(req.user_id)}`;
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
                    p.description,
                    p.description_full,
                    p.price,
                    p.discount,
                    p.amount,
                    p.visible
             FROM product p
             WHERE p.id = ${db.escape(id)}
               AND p.seller_id = ${db.escape(req.user_id)};`,
            (err, results, fields) => {
                // db error
                if (err) {
                    return response.internalError(res, err);
                }
                // nothing found
                if (!results.length) {
                    return response.notFound(res, "product_not_found", "No product found with id " + id + "!");
                }
                // send response
                return res.json(results[0]);
            }
        );
    }
);

router.put(
    "/:id",
    (req, res, next) => {
        const {id} = req.params;
        const {title, description, description_full, price, discount, amount, visible} = req.body;
        // edit product
        db.query(
            `UPDATE product p
             SET p.title            = ${db.escape(title)},
                 p.description      = ${db.escape(description)},
                 p.description_full = ${db.escape(description_full)},
                 p.price            = ${db.escape(price)},
                 p.discount         = ${db.escape(discount)},
                 p.amount           = ${db.escape(amount)},
                 p.visible          = ${db.escape(visible)}
             WHERE p.id = ${db.escape(id)}
               AND p.seller_id = ${db.escape(req.user_id)};`,
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

router.get(
    "/:id/images",
    (req, res, next) => {
        const {id} = req.params;
        // search images
        db.query(
            `SELECT i.id, i.path, i.order
             FROM product_has_image i
                      INNER JOIN product p on i.product_id = p.id
             WHERE i.product_id = ${db.escape(id)}
               AND p.seller_id = ${db.escape(req.user_id)}
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

router.post(
    "/:id/images",
    multer({dest: "./uploads/products/"}).single("image"),
    (req, res, next) => {
        const {id} = req.params;
        const image = req.file.filename;
        const ext = path.extname(req.file.originalname).toLowerCase();
        if (!(ext === ".png" || ext === ".jpg" || ext === ".jpeg")) {
            return response.badRequest(res, "invalid_image", "The image provided is invalid!");
        }
        // add image
        db.query(
            `INSERT INTO product_has_image (path, product_has_image.order, product_id)
             SELECT ${db.escape(image)},
                    IFNULL((SELECT MAX(i.order) + 1
                            FROM product_has_image i
                            WHERE i.product_id = ${db.escape(id)}
                            GROUP BY i.product_id), 0),
                    ${db.escape(id)}
             FROM product p
             WHERE p.seller_id = ${db.escape(req.user_id)}
             LIMIT 1;`,
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

router.put(
    "/images/:id",
    (req, res, next) => {
        const {id} = req.params;
        const {order} = req.body;
        // update image
        db.query(
            `UPDATE product_has_image i INNER JOIN product p on i.product_id = p.id
             SET i.order = ${db.escape(order)}
             WHERE i.id = ${db.escape(id)}
               AND p.seller_id = ${db.escape(req.user_id)};`,
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
    "/images/:id",
    (req, res, next) => {
        const {id} = req.params;
        // delete image
        db.query(
            `SELECT i.path
             FROM product_has_image i
                      INNER JOIN product p on i.product_id = p.id
             WHERE i.id = ${db.escape(id)}
               AND p.seller_id = ${db.escape(req.user_id)};`,
            (err1, results1, fields) => {
                // db error
                if (err1) {
                    return response.internalError(res, err1);
                }
                if (!results1.length) {
                    return res.send();
                }
                db.query(
                    `DELETE
                     FROM product_has_image i
                     WHERE i.id = ${db.escape(id)};`,
                    (err2, results2, fields) => {
                        // db error
                        if (err2) {
                            return response.internalError(res, err2);
                        }
                        const file = path.join(__dirname, "..", "..", "uploads", "products", results1[0].path);
                        fs.unlinkSync(file);
                        // send response
                        return res.send();
                    }
                );
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
                      INNER JOIN product p on q.product_id = p.id
                      LEFT JOIN product_faq_upvote up ON q.id = up.faq_id
             WHERE q.product_id = ${db.escape(id)}
               AND q.answer IS NULL
               AND p.seller_id = ${db.escape(req.user_id)}
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