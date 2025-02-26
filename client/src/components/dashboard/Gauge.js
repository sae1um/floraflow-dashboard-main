// const allowedUnits = {
//     temperature: ["Celcius", "Farenheit"],
//     humidity: []
// }
import Box from "@mui/material/Box"
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge"
import { LuSun, LuMoon } from "react-icons/lu";
import Divider from '@mui/material/Divider';
import { TbWind, TbWindOff } from "react-icons/tb";
import { useEffect, useState } from "react";

export function InfoCard({ title, value, colour }) {
    const [unit, setUnit] = useState("");
    
    useEffect(() => {
        switch (title) {
            case "TEMPERATURE":
                setUnit("°C")
                break;
            case "HUMIDITY":
                setUnit("%")
                break;
            case "MOISTURE LEVEL":
                setUnit("ml")
                break;
            default:
                break;
        }
    },[title])
    return (
        <Box
            className="rounded-lg border bg-card text-card-foreground shadow-sm relative p-4"
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div className="font-bold">
                {title}
            </div>
            <Gauge
                cornerRadius="50%"
                startAngle={0}
                endAngle={360}
                width={213}
                height={213}
                top="300px"
                innerRadius="85%"
                outerRadius="100%"
                value={value ? value : "..."}
                text={({ value }) => `${value}${unit}`}
                sx={(theme) => ({
                    [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 40
                    },
                    [`& .${gaugeClasses.valueArc}`]: {
                        fill: colour,
                    },
                })}
            />
        </Box>
    )
};

export function ControlStatusCard({ lightStatus, ventStatus }) {
    return (
    <Box
        className="flex flex-row justify-center items-center gap-4 rounded-lg border bg-card text-card-foreground shadow-sm relative p-4"
        sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        }}
    >
        <div className="flex flex-col justify-center h-full px-4">
            <div className="font-bold">
                LIGHT STATUS
            </div>
            <div>
                {
                    lightStatus ?
                        <div className="flex flex-col justify-center items-center gap-4">
                            <LuSun className="text-yellow-500 h-12 w-12"/>
                            <p>ON</p>
                        </div>
                        :
                        <div className="flex flex-col justify-center items-center gap-4">
                            <LuMoon className="text-blue-500 h-12 w-12"/>
                            <p>OFF</p>
                        </div>
                }
            </div>
        </div>
        <Divider orientation="vertical"/>
        <div className="flex flex-col justify-center h-full px-4">
            <div className="font-bold">
                VENT STATUS
            </div>
            <div>
                {
                    ventStatus ?
                        <div className="flex flex-col justify-center items-center gap-4">
                            <TbWind className="h-12 w-12 text-teal-500"/>
                            <p>OPEN</p>
                        </div>
                        :
                        <div className="flex flex-col justify-center items-center gap-4">
                            <TbWindOff className="h-12 w-12 "/>
                            <p>CLOSED</p>
                        </div>
                }
            </div>
        </div>
    </Box>
    )
}