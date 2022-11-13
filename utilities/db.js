const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "10.10.10.2",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "application",
});

connection.connect((err) => {
  if (err) return console.log(err); //return console.log("[DB] No database connection...");
  console.log("[DB] Successful connection...");
});

module.exports = connection;
