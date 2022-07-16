const db = require('./db');

async function getUserData(user_id) {
    const [results,] = await db.promise().query(
        `SELECT u.id, u.type, u.username, u.email, u.avatar
         FROM user u
         WHERE u.id = ?;`,
        [user_id]
    );
    return results;
}

async function editUserAvatar(user_id, avatar) {
    const [results,] = await db.promise().query(
        `UPDATE user u
         SET u.avatar = ?
         WHERE u.id = ?;`,
        [avatar, user_id]
    );
    return results;
}

async function getUserAddress(user_id) {
    const [results,] = await db.promise().query(
        `SELECT a.street, a.civic_number, a.postal_code, a.city, a.district
         FROM address a
                  INNER JOIN user u on a.id = u.address_id
         WHERE u.id = ?;`,
        [user_id]
    );
    return results;
}

async function editUserAddress(user_id, street, civic_number, postal_code, city, district) {
    const [results,] = await db.promise().query(
        `UPDATE address a INNER JOIN user u ON a.id = u.address_id
         SET a.street       = ?,
             a.civic_number = ?,
             a.postal_code  = ?,
             a.city         = ?,
             a.district     = ?
         WHERE u.id = ?;`,
        [street, civic_number, postal_code, city, district, user_id]
    );
    return results;
}

async function getBuyerProfile(user_id) {
    const [results,] = await db.promise().query(
        `SELECT u.id,
                u.type,
                u.username,
                u.email,
                u.avatar,
                b.name,
                b.surname,
                b.fiscal_code,
                b.gender
         FROM user u
                  INNER JOIN buyer b ON u.id = b.id
         WHERE u.id = ?;`,
        [user_id]
    );
    return results;
}

async function editBuyerProfile(user_id, name, surname, fiscal_code, gender) {
    const [results,] = await db.promise().query(
        `UPDATE buyer b
         SET b.name        = ?,
             b.surname     = ?,
             b.fiscal_code = ?,
             b.gender      = ?
         WHERE b.id = ?;`,
        [name, surname, fiscal_code, gender, user_id]
    );
    return results;
}

async function getBuyerBalance(buyer_id) {
    const [results,] = await db.promise().query(
        `SELECT b.balance
         FROM buyer b
         WHERE b.id = ?;`,
        [buyer_id]
    );
    return results;
}

async function increaseBuyerBalance(buyer_id, amount) {
    const [results,] = await db.promise().query(
        `UPDATE buyer b
         SET b.balance = b.balance + ?
         WHERE b.id = ?;`,
        [amount, buyer_id]
    );
    return results;
}

async function decreaseBuyerBalance(buyer_id, amount) {
    const [results,] = await db.promise().query(
        `UPDATE buyer b
         SET b.balance = IF(? > b.balance, 0, b.balance - ?)
         WHERE b.id = ?;`,
        [amount, buyer_id, buyer_id]
    );
    return results;
}

async function getSellerProfile(user_id) {
    const [results,] = await db.promise().query(
        `SELECT u.id,
                u.type,
                u.username,
                u.email,
                u.avatar,
                s.name,
                s.vat
         FROM user u
                  INNER JOIN seller s ON u.id = s.id
         WHERE u.id = ?;`,
        [user_id]
    );
    return results;
}

async function editSellerProfile(user_id, name, vat) {
    const [results,] = await db.promise().query(
        `UPDATE seller s
         SET s.name = ?,
             s.vat  = ?
         WHERE s.id = ?;`,
        [name, vat, user_id]
    );
    return results;
}

module.exports = {
    getUserData,
    editUserAvatar,
    getUserAddress,
    editUserAddress,
    getBuyerProfile,
    editBuyerProfile,
    getBuyerBalance,
    increaseBuyerBalance,
    decreaseBuyerBalance,
    getSellerProfile,
    editSellerProfile
}
