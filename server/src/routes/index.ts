import { Router } from "express";
import { router as OnboardingRouter } from "./onboarding";
import { router as GreenhouseRouter } from "./greenhouses";
export const router = Router();

router.get("/api", (req, res) => {
    res.status(200).send("OK");
});

router.use("/api/onboarding", OnboardingRouter);
router.use("/api/greenhouses", GreenhouseRouter);
