const db = require('./db');

async function getAll(user_id) {
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
                a.district                  AS shipment_district,
                (SELECT ohs.date
                 FROM order_has_state ohs
                 WHERE ohs.order_id = o.id
                 ORDER BY ohs.date
                 LIMIT 1)                   AS date
         FROM \`order\` o
                  INNER JOIN shipment s ON o.shipment_id = s.id
                  INNER JOIN address a on s.id = a.id
                  INNER JOIN order_has_product ohp on o.id = ohp.order_id
         WHERE s.buyer_id = ?
         GROUP BY o.id
         ORDER BY date DESC;`,
        [user_id]
    );
    return results;
}

async function get(user_id, order_id) {
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
           AND o.id = ?
         GROUP BY o.id;`,
        [user_id, order_id]
    );
    return results;
}

async function getOrderProducts(user_id, order_id) {
    const [results,] = await db.promise().query(
        `SELECT p.id,
                p.title,
                ohp.amount,
                ohp.price,
                (ohp.price * ohp.amount) AS total,
                (SELECT pi.path
                 FROM product_has_image pi
                 WHERE pi.product_id = p.id
                 ORDER BY pi.order
                 LIMIT 1)                AS cover
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

async function addOrder(shipment_id, payment_type, payment_data) {
    const [results,] = await db.promise().query(
        `INSERT INTO \`order\` (payment_type, payment_data, shipment_id)
         VALUES (?, ?, ?);`,
        [payment_type, payment_data, shipment_id]
    );
    return results;
}

async function addOrderProductsFromCart(user_id, order_id) {
    const [results,] = await db.promise().query(
        `INSERT INTO order_has_product (order_id, product_id, amount, price)
         SELECT ?,
                p.id,
                c.amount,
                ROUND(p.price * (100 - p.discount) / 100, 2)
         FROM cart c
                  INNER JOIN product p ON c.product_id = p.id
         WHERE c.buyer_id = ?;`,
        [order_id, user_id]
    );
    return results;
}

async function addOrderState(order_id, state) {
    const [results,] = await db.promise().query(
        `INSERT INTO order_has_state (order_id, state)
         VALUES (?, ?);`,
        [order_id, state]
    );
    return results;
}

async function getAllAdmin() {
    const [results,] = await db.promise().query(
        `SELECT o.id,
                u.email,
                b.name,
                b.surname,
                (SELECT ohs.date
                 FROM order_has_state ohs
                 WHERE ohs.order_id = o.id
                 ORDER BY ohs.date
                 LIMIT 1) AS date,
                (SELECT ohs.state
                 FROM order_has_state ohs
                 WHERE ohs.order_id = o.id
                 ORDER BY ohs.date DESC
                 LIMIT 1) AS state
         FROM \`order\` o
                  INNER JOIN shipment s ON o.shipment_id = s.id
                  INNER JOIN user u ON s.buyer_id = u.id
                  INNER JOIN buyer b ON s.buyer_id = b.id
         ORDER BY date DESC;`,
        []
    );
    return results;
}

module.exports = {
    getAll,
    get,
    getOrderProducts,
    getOrderStates,
    addOrder,
    addOrderProductsFromCart,
    addOrderState,
    getAllAdmin
}
