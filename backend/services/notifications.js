const db = require('./db');

async function getAllUnread(user_id) {
    const [results,] = await db.promise().query(
        `SELECT n.id, n.title, n.description, n.type, n.data, n.created
         FROM notification n
                  INNER JOIN user_has_notification uhn on n.id = uhn.notification_id
         WHERE uhn.user_id = ?
           AND uhn.read = 0
         ORDER BY n.created DESC;`,
        [user_id]
    );
    return results;
}

async function getAmount(user_id) {
    const [results,] = await db.promise().query(
        `SELECT COUNT(*) AS amount
         FROM notification n
                  INNER JOIN user_has_notification uhn on n.id = uhn.notification_id
         WHERE uhn.user_id = ?
           AND uhn.read = 0
         GROUP BY n.id;`,
        [user_id]
    );
    return results;
}

async function getAllRead(user_id) {
    const [results,] = await db.promise().query(
        `SELECT n.id, n.title, n.description, n.type, n.data, n.created, uhn.read
         FROM notification n
                  INNER JOIN user_has_notification uhn on n.id = uhn.notification_id
         WHERE uhn.user_id = ?
           AND uhn.read = 1
         ORDER BY n.created DESC;`,
        [user_id]
    );
    return results;
}

async function read(user_id, notification_id) {
    const [results,] = await db.promise().query(
        `UPDATE user_has_notification uhn
         SET uhn.read = 1
         WHERE uhn.user_id = ?
           AND uhn.notification_id = ?;`,
        [user_id, notification_id]
    );
    return results;
}

async function create(title, description, type, data) {
    const [results,] = await db.promise().query(
        `INSERT INTO notification (title, description, type, data)
         VALUES (?, ?, ?, ?);`,
        [title, description, type, data]
    );
    return results;
}

async function sendToUser(user_id, notification_id) {
    const [results,] = await db.promise().query(
        `INSERT INTO user_has_notification (user_id, notification_id)
         VALUES (?, ?);`,
        [user_id, notification_id]
    );
    return results;
}

module.exports = {
    getAllUnread,
    getAmount,
    getAllRead,
    read,
    create,
    sendToUser
}
