require("dotenv").config("../.env")
const express = require("express");
const cors = require("cors");
const app = express();
const {
  getGreenhouses,
  addDataToDatabase,
  getGreenhouseChartData,
} = require("../dbqueries");
const { extractGreenhouseData } = require("../extractions");

const PORT = process.env.API_PORT

app.use(cors());
app.use(express.json());

app.use(express.static("../build"));

app.get("/", (req, res) => {
  req.setTimeout(30000);
  console.log("Started Succesfully");
  res.json("Route: '/'");
});

app.get("/api/greenhouses", (req, res) => {
  getGreenhouses(async (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching from db" });
      return;
    }
    try {
      data = await extractGreenhouseData(data);
    } catch (err) {
      console.error(err);
    }
    // console.log(data);
    res.json(data);
  });
});

//CHANGE BACK TO req.query
app.get("/api/updateSensor", (req, res) => {
  const query = req.query;

  const sensorId = query.gardenid;
  const temperature = query.temperature;
  const humidity = query.humidity;
  const light = query.light;
  const waterLevel = query.waterlevel;

  console.log(sensorId, temperature, humidity, light, waterLevel);

  try {
    addDataToDatabase(sensorId, temperature, humidity, light, waterLevel);
  } catch (err) {
    console.log(err);
  }
  res.json(query);
});

app.get("/api/chart", (req, res) => {
  const query = req.query;
  const id = query.id;

  if(id) {
    getGreenhouseChartData(id, async (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error" });
        return;
      }
      console.log(data);
      res.json(data);
    });
  }else if(!id){
    console.log(`No id specified \nid: ${id}`);
    res.json(`No id specified, id: ${id}`);
    return;
  }
});

app.listen(PORT, () => {
  console.log(`listening port: ${PORT}`);
});
