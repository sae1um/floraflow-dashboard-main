const { connection } = require("./database");

function connectDB(){
    connection.connect((err) => {
        if(err) {
            console.log(err);
        }
        console.log("Connected " + connection.threadId);
        return connection;
    })
}

/* Request to get registered greenhouses from the DB */
function getGreenhouses(callback){
    connectDB();
    connection.query("select * from greenhouses", (err, results, fields) => {
        if(err){
            console.error(err.stack);
            callback(err, null);
            return;
        }
        callback(null, results);
    });
}

/* Request to get all rooms from the DB */
function getRooms(){
    return new Promise((resolve, reject) => {
        connectDB();
        connection.query("select * from rooms", (err, results) => {
            if(err){
                console.error(err.stack);
                reject(err);
            }else{
                resolve(results);
            }
        });
    });
}

/* Request to get greenhouse data from the DB */
function getGreenhouseData(){
    return new Promise((resolve, reject) => {
        connectDB();
        connection.query("select * from greenhouse_data order by timestamp desc", (err, results) => {
            if(err){
                console.error(err.stack);
                reject(err);
            }else{
                resolve(results);
            }
        });
    });
}

/* TEST function
function getGreenhouseData(){
    return new Promise((resolve, reject) => {
        connectDB();
        connection.query("select * from greenhouse_data order by timestamp desc", (err, results) => {
            if(err){
                console.error(err.stack);
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    });
}*/

/* Get temperature, humidty and time for specific greenhouse */
function getGreenhouseChartData(greenhouseId, callback){
    return new Promise((resolve, reject) => {
        connectDB();
        connection.query(`select temperature, humidity, DATE_FORMAT(timestamp, '%H:%i') AS formatted_time from greenhouse_data where greenhouse_id = ${greenhouseId}`, (err, results) => {
            if(err){
                console.error(err.stack);
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    });
}

/* ----- UPDATE DATABASE ----- */
function addDataToDatabase(id, temperature, humidity, light, water){
    return new Promise((resolve, reject) => {
        connectDB();
        connection.query(`insert into greenhouse_data (greenhouse_id, temperature, humidity, co2, light_level, water_level) values (${id},${temperature},${humidity},0,${light},${water})`, (err, results) => {
            if(err){
                console.error(err);
                reject(err);
            }else{
                console.log("Updated");
                resolve(results);
            }
        });
    })
}

module.exports = { getGreenhouses, getRooms, getGreenhouseData, getGreenhouseChartData, addDataToDatabase}
