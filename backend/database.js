require("dotenv").config();
const mysql = require("mysql2");

// const connection = mysql.createConnection({
//     host: process.env.FF_DB_HOST,
//     user: process.env.FF_DB_USER,
//     password: process.env.FF_DB_PASSWORD,
//     database: process.env.FF_DB_NAME,
//     port: process.env.FF_DB_PORT
// })

const connection = mysql.createConnection({
    host: "by0fd6ltaubwy7jfy5ut-mysql.services.clever-cloud.com",
    user: "upqfztbs9wwyoc4k",
    password: "RFxSMoeUwqUu9LP55hcc",
    database: "by0fd6ltaubwy7jfy5ut",
    port: 3306
})

const pool = mysql.createPool("mysql://upqfztbs9wwyoc4k:RFxSMoeUwqUu9LP55hcc@by0fd6ltaubwy7jfy5ut-mysql.services.clever-cloud.com:3306/by0fd6ltaubwy7jfy5ut");

/*
function connectDB(){
    connection.connect((err) => {
        if(err) {
            console.log(err);
        }
        console.log("Connected " + connection.threadId);
        return connection;
    })
}

connectDB();
*/
module.exports = { connection, pool };