const db = require('./db');

async function getProducts(user_id) {
    const [results,] = await db.promise().query(
        `SELECT p.id,
                p.title,
                p.amount                                                  AS max_amount,
                p.price,
                p.discount,
                c.amount,
                ROUND(p.price * (100 - p.discount) / 100, 2)              AS current_price,
                (ROUND(p.price * (100 - p.discount) / 100, 2) * c.amount) AS total,
                (SELECT pi.path
                 FROM product_has_image pi
                 WHERE pi.product_id = p.id
                 ORDER BY pi.order
                 LIMIT 1)                                                 AS cover
         FROM cart c
                  INNER JOIN product p ON c.product_id = p.id
         WHERE c.buyer_id = ?;`,
        [user_id]
    );
    return results;
}

async function addProduct(user_id, product_id, amount) {
    const [results,] = await db.promise().query(
        `INSERT INTO cart (buyer_id, product_id, amount)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE amount = amount + ?;`,
        [user_id, product_id, amount, amount]
    );
    return results;
}

async function editProduct(user_id, product_id, amount) {
    const [results,] = await db.promise().query(
        `INSERT INTO cart (buyer_id, product_id, amount)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE amount = ?;`,
        [user_id, product_id, amount, amount]
    );
    return results;
}

async function removeProducts(user_id) {
    const [results,] = await db.promise().query(
        `DELETE
         FROM cart c
         WHERE c.buyer_id = ?;`,
        [user_id]
    );
    return results;
}

async function removeProduct(user_id, product_id) {
    const [results,] = await db.promise().query(
        `DELETE
         FROM cart c
         WHERE c.buyer_id = ?
           AND c.product_id = ?;`,
        [user_id, product_id]
    );
    return results;
}

module.exports = {
    getProducts,
    addProduct,
    editProduct,
    removeProducts,
    removeProduct
}
