import express from "express"
import cors from "cors"
import "dotenv/config"
// import { clerkMiddleware, requireAuth, getAuth } = from "@clerk/express"


const app = express();

//ROUTERS
const OnboardingRouter = require("./routes/onboarding");

const PORT = process.env.PORT

//MIDDLEWARE
app.use(express.json());
app.use(cors());
// app.use(clerkMiddleware());

app.get("/", (req, res) => {
    res.status(200).json({mssg: "Main Route"})
})

app.use("/api/onboarding", OnboardingRouter);

app.listen(PORT, () => {
    console.log(`App listening port ${PORT}`)
});
