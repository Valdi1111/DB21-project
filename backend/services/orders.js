const db = require('./db');

async function getAll(user_id) {
    //     (SELECT ohs.date
    // FROM order_has_state ohs
    // WHERE ohs.order_id = o.id
    // ORDER BY ohs.date DESC
    // LIMIT 1)                   AS state,
    //     (SELECT ohs.date
    // FROM order_has_state ohs
    // WHERE ohs.order_id = o.id
    // ORDER BY ohs.date
    // LIMIT 1)
    const [results,] = await db.promise().query(
        `SELECT o.id,
                SUM(ohp.price * ohp.amount) AS total,
                o.payment_type,
                o.payment_data,
                o.shipment_id,
                s.name                      AS shipment_name,
                a.street                    AS shipment_street,
                a.civic_number              AS shipment_civic_number,
                a.postal_code               AS shipment_postal_code,
                a.city                      AS shipment_city,
                a.district                  AS shipment_district
         FROM \`order\` o
                  INNER JOIN shipment s ON o.shipment_id = s.id
                  INNER JOIN address a on s.id = a.id
                  INNER JOIN order_has_product ohp on o.id = ohp.order_id
         WHERE s.buyer_id = ?
         GROUP BY o.id;`,
        [user_id]
    );
    return results;
}

async function getOrderProducts(user_id, order_id) {
    const [results,] = await db.promise().query(
        `SELECT p.id, p.title, ohp.amount, ohp.price
         FROM order_has_product ohp
                  INNER JOIN product p on ohp.product_id = p.id
                  INNER JOIN \`order\` o on ohp.order_id = o.id
                  INNER JOIN shipment s on o.shipment_id = s.id
         WHERE s.buyer_id = ?
           AND ohp.order_id = ?;`,
        [user_id, order_id]
    );
    return results;
}

async function getOrderStates(user_id, order_id) {
    const [results,] = await db.promise().query(
        `SELECT ohs.state, ohs.date
         FROM order_has_state ohs
                  INNER JOIN \`order\` o on ohs.order_id = o.id
                  INNER JOIN shipment s on o.shipment_id = s.id
         WHERE s.buyer_id = ?
           AND ohs.order_id = ?
         ORDER BY ohs.date;`,
        [user_id, order_id]
    );
    return results;
}

async function addOrder(user_id, shipment_id, payment) {
    const [results,] = await db.promise().query(
        `INSERT INTO \`order\` (payment_type, shipment_id)
         SELECT ?, s.id
         FROM shipment s
         WHERE s.buyer_id = ?
           AND s.id = ?`,
        [payment, user_id, shipment_id]
    );
    return results;
}

async function addOrderProductsFromCart(user_id, order_id) {
    const [results,] = await db.promise().query(
        `INSERT INTO order_has_product (order_id, product_id, amount, price)
         SELECT ?,
                p.id,
                c.amount,
                p.price * (100 - p.discount) / 100
         FROM cart c
                  INNER JOIN product p ON c.product_id = p.id
         WHERE c.buyer_id = ?;`,
        [order_id, user_id]
    );
    return results;
}

async function addOrderState(user_id, order_id, state) {
    const [results,] = await db.promise().query(
        `INSERT INTO order_has_state (order_id, state)
         VALUES (?, ?);`,
        [order_id, state, user_id]
    );
    return results;
}

module.exports = {
    getAll,
    getOrderProducts,
    getOrderStates,
    addOrder,
    addOrderProductsFromCart,
    addOrderState
}
