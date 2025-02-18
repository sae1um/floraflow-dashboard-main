import { InfoCard, ControlStatusCard } from "../../components/dashboard/Gauge"
import { Box, Grid2 as Grid } from "@mui/material"
import WeatherWidget from "../../components/dashboard/WeatherWidget"

export default function Dashboard() {
    return (
        <Box sx={{ flexGrow: 1 }} className="p-4 flex justify-evenly">
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <InfoCard title="TEMPERATURE" value={"30"} colour={"#ed1515"}/>
                <InfoCard title="HUMIDITY" value={"21"} colour={"#f97316"}/>
                <ControlStatusCard lightStatus={true} ventStatus={false}/>
                <WeatherWidget />
            </Grid>
        </Box>
    )
};
