require("dotenv").config()
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.FF_DB_HOST,
    user: process.env.FF_DB_USER,
    password: process.env.FF_DB_PASSWORD,
    database: process.env.FF_DB_NAME,
    port: process.env.FF_DB_PORT
})

module.exports = { connection };