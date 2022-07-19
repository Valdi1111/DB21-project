const db = require('./db');

async function getAll(user_id) {
    const [results,] = await db.promise().query(
        `SELECT a.id, s.name, a.street, a.civic_number, a.postal_code, a.city, a.district
         FROM address a
                  INNER JOIN shipment s on a.id = s.id
         WHERE s.buyer_id = ?
           AND s.visible = 1;`,
        [user_id]
    );
    return results;
}

async function getById(user_id, shipment_id) {
    const [results,] = await db.promise().query(
        `SELECT a.id, s.name, a.street, a.civic_number, a.postal_code, a.city, a.district
         FROM address a
                  INNER JOIN shipment s on a.id = s.id
         WHERE s.buyer_id = ?
           AND s.id = ?
           AND s.visible = 1;`,
        [user_id, shipment_id]
    );
    return results;
}

async function add(user_id, name, address_id) {
    const [results,] = await db.promise().query(
        `INSERT INTO shipment (id, buyer_id, name)
         VALUES (?, ?, ?);`,
        [address_id, user_id, name]
    );
    return results;
}

async function remove(user_id, shipment_id) {
    const [results,] = await db.promise().query(
        `UPDATE shipment s
         SET s.visible = 0
         WHERE s.buyer_id = ?
           AND s.id = ?;`,
        [user_id, shipment_id]
    );
    return results;
}

module.exports = {
    getAll,
    getById,
    add,
    remove
}
