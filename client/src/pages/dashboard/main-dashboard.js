import { InfoCard, ControlStatusCard } from "../../components/dashboard/Gauge"
import { Box, Grid2 as Grid } from "@mui/material"
import { EmblaGaugesCarousel } from "../../components/carousel/EmblaCarousel"
import VisualiserTabs from "../../components/dashboard/VisualiserTabs"
import Chart from "../../components/charts/Chart"

export default function Dashboard() {
    return (
        <Box sx={{ flexGrow: 1 }} className="p-4">
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
                sx={{
                    justifyContent: "center",
                    display: {
                        xs: "none",
                        sm: "none",
                        md: "flex",
                        lg: "flex"
                    }
                }}
            >
                <InfoCard title="TEMPERATURE" value={"21"} colour={"#ed1515"} />
                <InfoCard title="HUMIDITY" value={"21"} colour={"#f97316"} />
                <InfoCard title="SOIL MOISTURE" value={"21"} colour={"#10b981"} />
                <ControlStatusCard lightStatus={true} ventStatus={false} />
            </Grid>
            <Box sx={{ display: { xs: 'block', sm: "block", md: 'none', lg: 'none' },  borderBottom: 1, borderColor: 'divider'}}>
                <EmblaGaugesCarousel />
            </Box>
            <Box>
                <VisualiserTabs />
            </Box>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 4, md: 6 }}>
                <div size={4}><Chart /></div>
                <div>
                    <h1 className="font-bold text-2xl uppercase p-3">
                        Notifications and Quick Actions
                    </h1>
                </div>
            </Grid>
        </Box>
    )
};
