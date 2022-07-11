const db = require('./db');

async function getAll(user_id) {
    const [results,] = await db.promise().query(
        `SELECT p.id, p.type, p.number, p.owner, p.expire
         FROM payment p
         WHERE p.buyer_id = ?;`,
        [user_id]
    );
    return results;
}

async function add(user_id, type, number, owner, expire) {
    const [results,] = await db.promise().query(
        `INSERT INTO payment (type, number, owner, expire, buyer_id)
         VALUES (?, ?, ?, ?, ?);`,
        [type, number, owner, expire, user_id]
    );
    return results;
}

async function remove(user_id, payment_id) {
    const [results,] = await db.promise().query(
        `DELETE
         FROM payment p
         WHERE p.buyer_id = ?
           AND p.id = ?;`,
        [user_id, payment_id]
    );
    return results;
}

module.exports = {
    getAll,
    add,
    remove
}
