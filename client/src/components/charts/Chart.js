import React from 'react'
// import { greenhouseData } from '../libs/data/testGreenhouseData'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Box } from '@mui/material'
const greenhouseData = [
    { temperature: 27, humidity: 46, formatted_time: "09:26" },
    { temperature: 28, humidity: 48, formatted_time: "09:30" },
    { temperature: 29, humidity: 50, formatted_time: "09:35" },
    { temperature: 30, humidity: 52, formatted_time: "09:40" },
  ];
function Chart({name}) {
    return (
        <Box 
            sx={{ display: "flex", justifyContent: "center", border: 1, borderColor: "divider" }}
            className="rounded-lg"
        >
            <h1
                className='font-bold text-2xl uppercase p-3'
            >
                <span className='italic'>{"Roses"}</span> - hourly data
            </h1>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={greenhouseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="formatted_time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temperature" stroke="#ff7300" strokeWidth={2} />
                    <Line type="monotone" dataKey="humidity" stroke="#007bff" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    )
}

export default Chart