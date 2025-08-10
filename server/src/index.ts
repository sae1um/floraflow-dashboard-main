import { app } from "./config/express";
import "dotenv/config";
// import { clerkMiddleware, requireAuth, getAuth } = from "@clerk/express"

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`App listening port ${PORT}`);
});
