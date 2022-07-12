const db = require('./db');

async function add(street, civic_number, postal_code, city, district) {
    const [results,] = await db.promise().query(
        `INSERT INTO address (street, civic_number, postal_code, city, district)
         VALUES (?, ?, ?, ?, ?)`,
        [street, civic_number, postal_code, city, district]
    );
    return results;
}

module.exports = {
    add
}
