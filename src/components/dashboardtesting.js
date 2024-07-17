import { Box } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { styled } from "@mui/system";
import { HiOutlineClock, HiOutlineEye } from "react-icons/hi";
import { useEffect, useState } from "react";
import axios from "axios";

import {LineGraph} from "./graphs/Line";

//API endpoint URLs
const GREENHOUSE_DATA_API = "/api/greenhouses";
const CHART_API = "/api/chart";

const GaueTitleText = styled("p")({
  position: "absolute",
  color: "rgb(156,163,175)",
  fontSize: "16px",
  fontWeight: "light",
  textAlign: "center",
  top: "85px",
  left: "215px",
});

export default function DashBoard() {
  //Time variables
  let time = new Date().toLocaleTimeString();
  const [currTime, setCurrentTime] = useState(useState(time));

  //Greenhouse fetch variables
  const [greenhouses, setGreenhouses] = useState([]);
  const [selectedGreenhouse, setSelectedGreenhouse] = useState(null);
  const [chartData, setChartData] = useState([]);

  const fetchGreenhouses = async () => {
    try {
      //Gets the data from db, sets greenhouses to data
      const response = await axios.get(GREENHOUSE_DATA_API);
      setGreenhouses(response.data);
      
      //Checks if there is a Gh already selected
      if(response.data.length > 0 && selectedGreenhouse){
        let gh = response.data;
        for(let i = 0; i <= gh.length - 1; i++){
          //iterates through the data to match the one already selected
          let ghElement = gh[i];
          if(ghElement.outGreenhousename === selectedGreenhouse.outGreenhousename){
            //If names are same
            if(ghElement.temperature !== selectedGreenhouse.temperature){
              // If the temp of selected and new data does not match then set selected to new data
              selectedGreenhouse.temperature = ghElement.temperature;
              break;
            }
          }
        }
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  //Gets the chart data from db and setschartdata usestate
  const getChartData = async (greenhouseId) => {
    try{
      const response = await axios.get(CHART_API, {
        params: {id: greenhouseId}
      });
      setChartData(response.data);
    }catch(err){
      console.log(`Error: ${err}`);
    }
  }

  const handleSelectGreenhouse = (greenhouse) => {
    try{
      setSelectedGreenhouse(greenhouse);
      getChartData(selectedGreenhouse.greenhouseId);
    }catch(err){
      console.error(err);
    }
  };


  //FetchGreenhouses on page load
  useEffect(() => {
    fetchGreenhouses();
  }, []);
  //Fetches every 10s
  // usEfectt(() => {
  //   const interval = setInterval(fetchGreenhouses, 10000);
  //   return () => clearInterval(interval);
  // }, []);


  //Sends Chartdata to getchartdata function when selectedGreenhouse is updated
  useEffect(() => {
    if(selectedGreenhouse){
      // console.log(selectedGreenhouse);
      getChartData(selectedGreenhouse.greenhouseId);
    }
  }, [selectedGreenhouse]);

  //Updates time every 1s
  const updateTime = () => {
    let time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  };
  setInterval(updateTime, 1000);

  return (
    <div class="grid grid-cols-5 grid-rows-3 gap-4 p-4 h-screen ">
      {/* Temperature Gauge */}
      <div className="col-span-1 flex flex-col">
        <Box
          className="bg-neutral-100 p-4 rounded-xl  h-full"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>TEMPERATURE</p>
          <Gauge
            cornerRadius="50%"
            startAngle={0}
            endAngle={360}
            width={213}
            height={213}
            top="300px"
            innerRadius="85%"
            outerRadius="100%"
            value={selectedGreenhouse ? selectedGreenhouse.temperature : "..."}
            text = {({value}) => `${value}°C`}
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
                '&:after': {
                content: '" °C"',
                fontSize: 20,
                verticalAlign: 'super',
              }
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: "#e63762",
              },
            })}
          />
        </Box>
      </div>
      {/* Humidity Gauge */}
      <div className="col-span-1">
        <Box
          className="bg-neutral-100 p-4 rounded-xl h-full"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p className={GaueTitleText}>HUMIDITY</p>
          <Gauge
            cornerRadius="50%"
            startAngle={0}
            endAngle={360}
            width={213}
            height={213}
            top="300px"
            innerRadius="85%"
            outerRadius="100%"
            value={ selectedGreenhouse ? selectedGreenhouse.humidity : "..." } //Humidity value
            text = {({value}) => `${value}%`}
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: "#f2a734",
              },
            })}
          />
        </Box>
      </div>
      {/* Light Level Gauge */}
      <div className="col-span-1">
        <Box
          className="bg-neutral-100 p-4 rounded-xl h-full"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p className={GaueTitleText}>Light Level</p>
          <Gauge
            cornerRadius="50%"
            startAngle={0}
            endAngle={360}
            width={213}
            height={213}
            top="300px"
            innerRadius="85%"
            outerRadius="100%"
            value={selectedGreenhouse ? selectedGreenhouse.lightLevel : "..."}
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: "#27a568",
              },
            })}
          />
        </Box>
      </div>
      {/* Welcome message and time */}
      <div className="col-span-2">
        <Box className="col-span-2 w-full flex flex-col gap-2 bg-card-image bg-center bg-cover rounded-lg text-gray-100 p-10 h-full">
          <div className="flex-1 font-bold">
            Hello, <br />
            Welcome to the FloraFlow dashboard.
          </div>
          <div className="flex flex-row gap-2 items-center h-full">
            <HiOutlineClock className="text-2xl" />
            <p className="font-bold text-center">{currTime}</p>
          </div>
        </Box>
      </div>
      {/* Line Graph */}
      <div class=" col-span-3">
        <Box className="bg-neutral-100 p-4 rounded-xl h-auto w-full">
          <h3 className="font-bold text-center">{selectedGreenhouse? `${selectedGreenhouse.outGreenhousename} - Hourly Data` : "Select a Greenhouse"}</h3>
          <LineGraph data={chartData}/>
        </Box>
      </div>
      {/* Quick Access greenhouses */}
      <div class="col-span-2 max-h-20">
        <Box className="bg-neutral-100 p-4 rounded-xl h-auto w-full overflow-x-scroll">
          <div className="flex flex-row gap-10 justify-center items-center h-full p-2">
            <h1 className="text-2xl font-bold text-center">Greenhouse Data</h1>
            <button
              onClick={ fetchGreenhouses }
              className="bg-[#31CF23] hover:bg-[#2b8023] text-white font-bold p-2 rounded-lg h-1/2"
            >
              Refresh
            </button>
          </div>
          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full bg-white border border-gray-200 ">
              <thead className="">
                <tr className="text-white">
                  <th className="px-4 py-2 border-b bg-[#31CF23] text-white">
                    Action
                  </th>
                  <th className="px-4 py-2 border-b bg-[#31CF23] text-white">
                    Sensor Name
                  </th>
                  <th className="px-4 py-2 border-b bg-[#31CF23] text-white">
                    Room
                  </th>
                  <th className="px-4 py-2 border-b bg-[#31CF23] text-white">
                    Status
                  </th>
                  <th className="px-4 py-2 border-b bg-[#31CF23] text-white">
                    Temperature
                  </th>
                </tr>
              </thead>
              <tbody>
                {greenhouses.length > 0 ? (
                  greenhouses.map((greenhouse, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border-b text-center">
                        <button
                          onClick={() => handleSelectGreenhouse(greenhouse)}
                          className="flex justify-center items-center h-full"
                        >
                          <HiOutlineEye size={24} />
                        </button>
                      </td>
                      <td className="px-4 py-2 border-b text-center">
                        {greenhouse.outGreenhousename}
                      </td>
                      <td className="px-4 py-2 border-b text-center">
                        {greenhouse.outRoomName}
                      </td>
                      <td className="px-4 py-2 border-b text-center">
                        {greenhouse.greenhouseStatus}
                      </td>
                      <td className="px-4 py-2 border-b text-center">
                        {greenhouse.temperature}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-2 border-b text-center">
                      Loading Data...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Box>
      </div>
    </div>
  );
}
