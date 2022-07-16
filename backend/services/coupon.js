const db = require('./db');

async function getByCode(code) {
    const [results,] = await db.promise().query(
        `SELECT c.id,
                c.code,
                c.value,
                c.expire,
                IF(CURRENT_DATE() > c.expire, TRUE, FALSE) AS expired,
                IF(cu.buyer_id IS NULL, FALSE, TRUE)       AS used
         FROM coupon c
                  LEFT JOIN coupon_used cu on c.id = cu.coupon_id
         WHERE c.code = ?;`,
        [code]
    );
    return results;
}

async function create(code, value, expire) {
    const [results,] = await db.promise().query(
        `INSERT INTO coupon(code, value, expire)
         VALUES (?, ?, DATE_ADD(CURRENT_DATE(), INTERVAL ? DAY))`,
        [code, value, expire]
    );
    return results;
}

async function use(buyer_id, coupon_id) {
    const [results,] = await db.promise().query(
        `INSERT IGNORE INTO coupon_used(coupon_id, buyer_id)
         VALUES (?, ?)`,
        [coupon_id, buyer_id]
    );
    return results;
}

module.exports = {
    getByCode,
    create,
    use
}
