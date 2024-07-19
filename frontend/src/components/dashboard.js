import { Box } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { styled } from "@mui/system";
import { HiOutlineClock } from "react-icons/hi";
import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import axios from "axios";

const API_URL = "http://localhost:3003/greenhouses";

// const GaugeText = styled("div")({
//   position: "absolute",
//   color: "#0B1C33",
//   fontSize: "40px",
//   fontWeight: "bold",
//   textAlign: "center",
//   background: "#FFF",
// });

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
  //GET request to API
  const [greenhouses, setGreenhouses] = useState([]);

  let time = new Date().toLocaleTimeString();
  const [currTime, setCurrentTime] = useState(useState(time));

  useEffect(() => {
    const fetchGreenhouses = async () => {
      try {
        const response = await axios.get(API_URL);
        setGreenhouses(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }else{
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchGreenhouses();
  }, []);

  useEffect(() => {
    fetch("/");
  }, []);

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
            value={25}
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
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
            value={69}
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
            value={25}
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
      {/* Welcom message and time */}
      <div className="col-span-2">
        <Box className="col-span-2 w-full flex flex-col gap-2 bg-card-image bg-center bg-cover rounded-lg text-gray-100 p-10 h-full">
          <div className="flex-1 font-bold">
            Hello, <br />
            Welcome to the FloraFlow dashboard.
          </div>
          <div className="flex flex-row gap-2 items-center h-full">
            <HiOutlineClock className="text-2xl"/>
            <p className="font-bold text-center">{currTime}</p>
          </div>
        </Box>
      </div>

      <div class=" col-span-3">
        <Box className="bg-neutral-100 p-4 rounded-xl h-auto w-full">
          <LineChart
            className="w-full"
            xAxis={[{ curve: "linear", data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                curve: "linear",
                data: [2, 5.5, 2, 8.5, 1.5, 5], //y-axis
              },
            ]}
            width={500}
            height={300}
          />
        </Box>
      </div>
      <div class="col-span-2">
        <Box className="bg-neutral-100 p-4 rounded-xl h-auto w-full">
        <div className="flex flex-row gap-10 justify-center">
          <h1 className="text-2xl font-bold mb-4">Greenhouse Data</h1>
          {/* <button onClick={fetchGreenhouses()} className="p-2 bg-[#E5E5E5] hover:bg-green-200 active:bg-[#31CF23]">Refresh</button> */}
        </div>
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full bg-white border border-gray-200 ">
          <thead className="">
            <tr className="text-white">
              <th className="px-4 py-2 border-b bg-[#31CF23] text-white">Sensor Name</th>
              <th className="px-4 py-2 border-b bg-[#31CF23] text-white">Room</th>
              <th className="px-4 py-2 border-b bg-[#31CF23] text-white">Status</th>
              <th className="px-4 py-2 border-b bg-[#31CF23] text-white">Temperature</th>
            </tr>
          </thead>
          <tbody>
            {greenhouses.length > 0 ? (
              greenhouses.map((greenhouse, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-b text-center">{greenhouse.outGreenhousename}</td>
                  <td className="px-4 py-2 border-b text-center">{greenhouse.outRoomName}</td>
                  <td className="px-4 py-2 border-b text-center">{greenhouse.greenhouseStatus}</td>
                  <td className="px-4 py-2 border-b text-center">{greenhouse.temperature}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 border-b text-center">Loading Data...</td>
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