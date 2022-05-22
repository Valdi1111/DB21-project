const mysql = require('mysql2');

// Create a connection to the database
const conn = mysql.createConnection({
    host: process.env.MYSQL_HOST,                  // Replace with your host name
    user: process.env.MYSQL_USER,                       // Replace with your database username
    password: process.env.MYSQL_PASSWORD,       // Replace with your database password
    database: process.env.MYSQL_DATABASE            // // Replace with your database Name
});

// open the MySQL connection
conn.connect(function(err) {
    if (err) {
        throw err;
    }
    console.log("Successfully connected to the database.");
});

module.exports = conn;