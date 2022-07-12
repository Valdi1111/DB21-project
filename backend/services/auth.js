const db = require('./db');

async function getUserByEmail(email) {
    const [results,] = await db.promise().query(
        `SELECT *
         FROM user u
         WHERE u.email = LOWER(?)`,
        [email]
    );
    return results;
}

async function getUserByUsername(username) {
    const [results,] = await db.promise().query(
        `SELECT *
         FROM user u
         WHERE LOWER(u.username) = LOWER(?)`,
        [username]
    );
    return results;
}

async function updateLastLogin(id) {
    const [results,] = await db.promise().query(
        `UPDATE user u
         SET u.last_login=NOW()
         WHERE u.id = ?`,
        [id]
    );
    return results;
}

async function createUser(type, username, email, password, address_id) {
    const [results,] = await db.promise().query(
        `INSERT INTO user (type, username, email, password, address_id)
         VALUES (?, ?, LOWER(?), ?, ?)`,
        [type, username, email, password, address_id]
    );
    return results;
}

async function createBuyer(user_id, name, surname, fiscal_code, gender) {
    const [results,] = await db.promise().query(
        `INSERT INTO buyer (id, name, surname, fiscal_code, gender)
         VALUES (?, ?, ?, ?, ?)`,
        [user_id, name, surname, fiscal_code, gender]
    );
    return results;
}

async function createSeller(user_id, name, vat) {
    const [results,] = await db.promise().query(
        `INSERT INTO seller (id, name, vat)
         VALUES (?, ?, ?)`,
        [user_id, name, vat]
    );
    return results;
}

async function createStaff(email, password) {
    const [results,] = await db.promise().query(
        `INSERT INTO user (email, password)
         VALUES (LOWER(?), ?)`,
        [email, password]
    );
    return results;
}

module.exports = {
    getUserByEmail,
    getUserByUsername,
    updateLastLogin,
    createUser,
    createBuyer,
    createSeller,
    createStaff
}
