const db = require('./db');

async function getAll() {
    const [results,] = await db.promise().query(
        `SELECT *
         FROM category;`,
        []
    );
    return results;
}

module.exports = {
    getAll,
}
