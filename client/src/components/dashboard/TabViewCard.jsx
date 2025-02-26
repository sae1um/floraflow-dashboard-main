import React from 'react'
import { Box } from '@mui/material'
import { Thermometer, Droplets, Wind, Sprout } from "lucide-react"
import Chip from '@mui/material/Chip';
export default function TabViewCard({name, power_status, room, temp, humidity, soil_moisture, vent_status, view}) {
    if(view === "grid"){
        return(
            <Box
                sx={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: "1rem", border: 1, borderColor: "divider", borderRadius: "1rem", padding: "1rem"}}
            >
                <div className='font-bold capitalize'>
                    {name}
                </div>
                <div className='flex flex-row items-center justify-between'>
                    <div>
                        <Chip color={power_status ? "success" : "error"} label={power_status ? "Online" : "Offline"}/>
                    </div>
                    <div className='font-semibold text-gray-500'>
                        {room}
                    </div>
                </div>
                <div>
                    <div className='grid grid-cols-2 gap-4 font-bold'>
                        <span className='flex flex-row items-center gap-2'>
                            <Thermometer className='text-rose-500'/> {temp} &deg;C
                        </span>
                        <span className='flex flex-row items-center gap-2'>
                            <Droplets className='text-blue-500' /> {humidity} %
                        </span>
                        <span className='flex flex-row items-center gap-2'>
                            <Wind className={`${vent_status ? "text-green-500" : "text-red-500"}`} /> 
                            {vent_status ? "Open" : "Closed"}
                        </span>
                        <span className='flex flex-row items-center gap-2'>
                            <Sprout className='text-lime-700' /> {soil_moisture} %
                        </span>
                    </div>
                </div>
            </Box>
        )
    }
    else if(view === "room"){
        return(
        <Box
            sx={{backgroundColor: "white", cursor: "pointer", display: "flex", flexDirection: "column", gap: "1rem", border: 1, borderColor: "divider", borderRadius: "1rem", padding: "1rem"}}
            className="hover:shadow-lg transition-shadow"
        >
            <div className='font-bold capitalize'>
                {name}
            </div>
            <div className='flex flex-row items-center justify-between'>
                <div>
                    <Chip color={power_status ? "success" : "error"} label={power_status ? "Online" : "Offline"}/>
                </div>
            </div>
            <div>
                <div className='grid grid-cols-2 gap-4 font-bold w-max'>
                    <span className='flex flex-row items-center gap-1'>
                        <Thermometer className='text-rose-500'/> {temp} &deg;C
                    </span>
                    <span className='flex flex-row items-center gap-1'>
                        <Droplets className='text-blue-500' /> {humidity} %
                    </span>
                    <span className='flex flex-row items-center gap-1'>
                        <Wind className={`${vent_status ? "text-green-500" : "text-red-500"}`} /> 
                        {vent_status ? "Open" : "Closed"}
                    </span>
                    <span className='flex flex-row items-center gap-1'>
                        <Sprout className='text-lime-700' /> {soil_moisture} %
                    </span>
                </div>
            </div>
        </Box>
        )
    }
    
}
