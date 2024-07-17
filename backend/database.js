const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "GardenDash123!",
    database: "floraflow"
})

module.exports = { connection };