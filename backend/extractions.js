const { getRooms, getGreenhouseData } = require("./dbqueries");
const fs = require("fs")

// const filePath = "../chartData.json";
// let chartFile = fs.readFileSync(filePath, "utf-8");

const obj = [
  { greenhouse_id: 1, greenhouse_name: "roses", room_id: 1, status: 0 },
  { greenhouse_id: 2, greenhouse_name: "blue flowers", room_id: 1, status: 0 },
  { greenhouse_id: 3, greenhouse_name: "pink ones", room_id: 2, status: 1 },
]; //Test data

async function extractGreenhouseData(data) {
  let room;
  let greenhouseData;

  try {
    room = await getRooms();
    greenhouseData = await getGreenhouseData();
  } catch (err) {
    console.error(err);
    return []; // Return an empty array in case of error
  }

  const outGreenhouseData = [];

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    const greenhouseId = element.greenhouse_id; 
    const greenhouseName = element.greenhouse_name;
    const roomId = element.room_id;
    const greenhouseStatus = element.status;

    // Find matching temperature data, if it exists
    const greenhouseElement = greenhouseData.find(
      (gd) => gd.greenhouse_id === greenhouseId
    );
    const temperature = greenhouseElement ? greenhouseElement.temperature : "--";
    const humidity =  greenhouseElement ? greenhouseElement.humidity : "--";
    const lightLevel = greenhouseElement ? greenhouseElement.light_level : "--";
    // const waterLevel (for future)
    // const cabonDioxide (for future)


    for (let j = 0; j < room.length; j++) {
      const roomElement = room[j];
      const id = roomElement.room_id;

      if (roomId === id) {
        const status = greenhouseStatus === 1 ? "online" : "offline";
        outGreenhouseData.push({
          greenhouseId: greenhouseId,
          outGreenhousename: greenhouseName,
          outRoomName: roomElement.room_name,
          greenhouseStatus: status,
          temperature: temperature,
          humidity: humidity,
          lightLevel: lightLevel 
        });
        break; // Break out of the room loop once a match is found
      }
    }
  }

  return outGreenhouseData; // make sure data is returned
}

module.exports = { extractGreenhouseData };
