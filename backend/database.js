const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "GardenDash123!",
    database: "floraflow"
})

module.exports = { connection };