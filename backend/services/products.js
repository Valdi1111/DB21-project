const db = require('./db');

async function getProducts(category, max_price, min_price, search, limit, offset) {
    let query = `SELECT DISTINCT p.id,
                                 p.title,
                                 p.description,
                                 p.price,
                                 p.discount,
                                 ROUND(p.price * (100 - p.discount) / 100, 2) AS current_price,
                                 (SELECT pi.path
                                  FROM product_has_image pi
                                  WHERE pi.product_id = p.id
                                  ORDER BY pi.order
                                  LIMIT 1)                                    AS cover
                 FROM product p
                          LEFT JOIN product_has_category c
                                    ON c.product_id = p.id
                 WHERE p.visible = ?
                   AND p.title LIKE ?`;
    if (category) {
        query += ` AND c.category_id = ${db.escape(category)}`;
    }
    query += ` HAVING current_price <= ? AND current_price >= ?`;
    query += ` LIMIT ${limit && !isNaN(limit) ? limit : 12} OFFSET ${offset && !isNaN(offset) ? offset : 0};`;
    const [results,] = await db.promise().query(
        query,
        [1, search ? `%${search}%` : `%%`, max_price ? max_price : Number.MAX_SAFE_INTEGER, min_price ? min_price : 0]
    );
    return results;
}

async function getProduct(product_id) {
    const [results,] = await db.promise().query(
        `SELECT p.id,
                p.title,
                p.description_full                           AS description,
                p.price,
                p.discount,
                ROUND(p.price * (100 - p.discount) / 100, 2) AS current_price,
                p.amount,
                p.seller_id,
                s.name                                       AS business_name,
                p.visible
         FROM product p
                  LEFT JOIN seller s ON s.id = p.seller_id
         WHERE p.id = ?;`,
        [product_id]
    );
    return results;
}

async function getImages(product_id) {
    const [results,] = await db.promise().query(
        `SELECT i.id, i.path, i.order
         FROM product_has_image i
         WHERE i.product_id = ?
         ORDER BY i.order;`,
        [product_id]
    );
    return results;
}

async function getAllRatings(product_id) {
    const [results,] = await db.promise().query(
        `SELECT r.rating, COUNT(*) AS amount
         FROM product_has_review r
         WHERE r.product_id = ?
         GROUP BY r.product_id, r.rating
         ORDER BY r.rating DESC;`,
        [product_id]
    );
    return results;
}

async function getRating(product_id) {
    const [results,] = await db.promise().query(
        `SELECT AVG(r.rating) AS average, COUNT(*) AS amount
         FROM product_has_review r
         WHERE r.product_id = ?
         GROUP BY r.product_id;`,
        [product_id]
    );
    return results;
}

async function getFaqs(product_id) {
    const [results,] = await db.promise().query(
        `SELECT q.id, q.question, q.answer, q.created, SUM(IFNULL(up.vote, 0)) AS upvotes
         FROM product_has_faq q
                  LEFT JOIN product_faq_upvote up ON q.id = up.faq_id
         WHERE q.product_id = ?
           AND q.answer IS NOT NULL
         GROUP BY q.id
         ORDER BY upvotes DESC;`,
        [product_id]
    );
    return results;
}

async function getReviews(product_id, order_type) {
    const [results,] = await db.promise().query(
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
         WHERE r.product_id = ?
         GROUP BY r.id
         ORDER BY ${order_type} DESC;`,
        [product_id]
    );
    return results;
}

/* BUYER */

async function addFaq(product_id, question) {
    const [results,] = await db.promise().query(
        `INSERT INTO product_has_faq (question, product_id)
         VALUES (?, ?);`,
        [question, product_id]
    );
    return results;
}

async function getFaqUpvote(user_id, faq_id) {
    const [results,] = await db.promise().query(
        `SELECT q.id, IFNULL(up.vote, 0) AS upvote
         FROM product_has_faq q
                  LEFT JOIN product_faq_upvote up ON q.id = up.faq_id AND up.upvoter_id = ?
         WHERE q.id = ?;`,
        [user_id, faq_id]
    );
    return results;
}

async function editFaqUpvote(user_id, faq_id, vote) {
    const [results,] = await db.promise().query(
        `INSERT INTO product_faq_upvote (faq_id, upvoter_id, vote)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE vote = ?;`,
        [faq_id, user_id, vote, vote]
    );
    return results;
}

async function addReview(user_id, product_id, title, description, image, rating) {
    if (image == null) {
        const [results,] = await db.promise().query(
            `INSERT INTO product_has_review (title, description, rating, product_id, reviewer_id)
             VALUES (?, ?, ?, ?, ?);`,
            [title, description, rating, product_id, user_id]
        );
        return results;
    }
    const [results,] = await db.promise().query(
        `INSERT INTO product_has_review (title, description, image, rating, product_id, reviewer_id)
         VALUES (?, ?, ?, ?, ?, ?);`,
        [title, description, image, rating, product_id, user_id]
    );
    return results;
}

async function getReviewHelpful(user_id, review_id) {
    const [results,] = await db.promise().query(
        //`SELECT r.id, CASE WHEN up.review_id IS NULL THEN FALSE ELSE TRUE END AS helpful
        `SELECT r.id, IF(up.review_id IS NULL, FALSE, TRUE) AS helpful
         FROM product_has_review r
                  LEFT JOIN product_review_upvote up ON r.id = up.review_id AND up.upvoter_id = ?
         WHERE r.id = ?;`,
        [user_id, review_id]
    );
    return results;
}

async function addReviewHelpful(user_id, review_id) {
    const [results,] = await db.promise().query(
        `INSERT IGNORE INTO product_review_upvote (review_id, upvoter_id)
         VALUES (?, ?);`,
        [review_id, user_id]
    );
    return results;
}

async function deleteReviewHelpful(user_id, review_id) {
    const [results,] = await db.promise().query(
        `DELETE
         FROM product_review_upvote
         WHERE review_id = ?
           AND upvoter_id = ?;`,
        [review_id, user_id]
    );
    return results;
}

/* SELLER */

async function getSellerProducts(user_id, search, limit, offset) {
    const [results,] = await db.promise().query(
        `SELECT DISTINCT p.id,
                         p.title,
                         p.description,
                         p.price,
                         p.discount,
                         ROUND(p.price * (100 - p.discount) / 100, 2) AS current_price,
                         (SELECT pi.path
                          FROM product_has_image pi
                          WHERE pi.product_id = p.id
                          ORDER BY pi.order
                          LIMIT 1)                                    AS cover
         FROM product p
         WHERE p.seller_id = ?
           AND p.title LIKE ?
         LIMIT ${limit && !isNaN(limit) ? limit : 12} OFFSET ${offset && !isNaN(offset) ? offset : 0};`,
        [user_id, search ? `%${search}%` : `%%`]
    );
    return results;
}

async function getSellerProduct(user_id, product_id) {
    const [results,] = await db.promise().query(
        `SELECT p.id,
                p.title,
                p.description,
                p.description_full,
                p.price,
                p.discount,
                ROUND(p.price * (100 - p.discount) / 100, 2) AS current_price,
                p.amount,
                p.visible
         FROM product p
         WHERE p.id = ?
           AND p.seller_id = ?;`,
        [product_id, user_id]
    );
    return results;
}

async function addSellerProduct(user_id, title, description, description_full, price, discount, amount) {
    const [results,] = await db.promise().query(
        `INSERT INTO product (title, description, description_full, price, discount, amount, seller_id)
         VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [title, description, description_full, price, discount, amount, user_id]
    );
    return results;
}

async function editSellerProduct(user_id, product_id, title, description, description_full, price, discount, amount, visible) {
    const [results,] = await db.promise().query(
        `UPDATE product p
         SET p.title            = ?,
             p.description      = ?,
             p.description_full = ?,
             p.price            = ROUND(?, 2),
             p.discount         = ROUND(?, 1),
             p.amount           = ?,
             p.visible          = ?
         WHERE p.id = ?
           AND p.seller_id = ?;`,
        [title, description, description_full, price, discount, amount, visible, product_id, user_id]
    );
    return results;
}

async function addImage(user_id, product_id, image) {
    const [results,] = await db.promise().query(
        `INSERT INTO product_has_image (path, product_has_image.order, product_id)
         SELECT ?,
                IFNULL((SELECT MAX(i.order) + 1
                        FROM product_has_image i
                        WHERE i.product_id = ?
                        GROUP BY i.product_id), 0),
                ?
         FROM product p
         WHERE p.seller_id = ?
         LIMIT 1;`,
        [image, product_id, product_id, user_id]
    );
    return results;
}

async function editImage(user_id, image_id, order) {
    const [results,] = await db.promise().query(
        `UPDATE product_has_image i INNER JOIN product p on i.product_id = p.id
         SET i.order = ?
         WHERE i.id = ?
           AND p.seller_id = ?;`,
        [order, image_id, user_id]
    );
    return results;
}

async function removeImage(user_id, image_id) {
    const [results1,] = await db.promise().query(
        `SELECT i.id, i.path
         FROM product_has_image i
                  INNER JOIN product p ON i.product_id = p.id
         WHERE p.seller_id = ?
           AND i.id = ?;`,
        [user_id, image_id]
    );
    if (results1.length === 0) {
        return [results1, null];
    }
    const [results2,] = await db.promise().query(
        `DELETE
         FROM product_has_image i
         WHERE i.id = ?;`,
        [results1[0].id]
    );
    return [results1, results2];
}

async function getUnansweredFaqs(user_id, product_id) {
    const [results,] = await db.promise().query(
        `SELECT q.id, q.question, q.answer, q.created, SUM(IFNULL(up.vote, 0)) AS upvotes
         FROM product_has_faq q
                  INNER JOIN product p on q.product_id = p.id
                  LEFT JOIN product_faq_upvote up ON q.id = up.faq_id
         WHERE q.product_id = ?
           AND q.answer IS NULL
           AND p.seller_id = ?
         GROUP BY q.id
         ORDER BY upvotes DESC;`,
        [product_id, user_id]
    );
    return results;
}

async function editFaqAnswer(user_id, faq_id, answer) {
    const [results,] = await db.promise().query(
        `UPDATE product_has_faq q INNER JOIN product p ON q.product_id = p.id
         SET q.answer = ?
         WHERE p.seller_id = ?
           AND q.id = ?;`,
        [answer, user_id, faq_id]
    );
    return results;
}

async function deleteFaq(user_id, faq_id) {
    const [results,] = await db.promise().query(
        `DELETE q
         FROM product_has_faq q
                  INNER JOIN product p ON q.product_id = p.id
         WHERE p.seller_id = ?
           AND q.id = ?;`,
        [user_id, faq_id]
    );
    return results;
}

module.exports = {
    getProducts,
    getProduct,
    getImages,
    getAllRatings,
    getRating,
    getFaqs,
    getReviews,
    // buyer
    addFaq,
    getFaqUpvote,
    editFaqUpvote,
    addReview,
    getReviewHelpful,
    addReviewHelpful,
    deleteReviewHelpful,
    // seller
    getSellerProducts,
    getSellerProduct,
    addSellerProduct,
    editSellerProduct,
    addImage,
    editImage,
    removeImage,
    getUnansweredFaqs,
    editFaqAnswer,
    deleteFaq
}
