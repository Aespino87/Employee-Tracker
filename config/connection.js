// Sets up connection to MySQL
const mysql = require("mysql");

const connection = mysql.createConnection( {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Windycity87",
    database: "employee_db",
    multipleStatements: true
});

// Makes the Connection
connection.connect(function(err) {
    if (err) {
        // "err.stack" Shows where the error is occuring 
        console.error("Error making connection: " + err.stack);
        return;
    }
    console.log("connected as id" + connection.threadId);
});

module.exports = connection;
