const db = require('./db');

async function getAllMessages(buyer_id, seller_id) {
    const [results,] = await db.promise().query(
        `SELECT *
         FROM message m
         WHERE m.buyer_id = ?
           AND m.seller_id = ?`,
        [buyer_id, seller_id]
    );
    return results;
}

async function getAllSellers(buyer_id) {
    const [results,] = await db.promise().query(
        `SELECT DISTINCT s.id, s.name, u.username, u.email, u.avatar
         FROM message m
                  INNER JOIN user u on m.seller_id = u.id
                  INNER JOIN seller s on m.seller_id = s.id
         WHERE m.buyer_id = ?`,
        [buyer_id]
    );
    return results;
}

async function getAllBuyers(seller_id) {
    const [results,] = await db.promise().query(
        `SELECT DISTINCT b.id, b.name, b.surname, u.username, u.email, u.avatar
         FROM message m
                  INNER JOIN user u on m.seller_id = u.id
                  INNER JOIN buyer b on m.seller_id = b.id
         WHERE m.seller_id = ?`,
        [seller_id]
    );
    return results;
}

async function sendMessage(buyer_id, seller_id, text, is_sender_buyer) {
    const [results,] = await db.promise().query(
        `INSERT INTO message(text, sent, buyer_id, seller_id)
         VALUES (?, ?, ?, ?)`,
        [text, is_sender_buyer, buyer_id, seller_id]
    );
    return results;
}

module.exports = {
    getAllMessages,
    getAllSellers,
    getAllBuyers,
    sendMessage
}
