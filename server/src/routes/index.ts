import express, { Router } from "express";
import { router as OnboardingRouter } from "./onboarding";

export const router = Router();

router.get("/", (req, res) => {
    res.status(200).send("OK");
});

router.use("/api/onboarding", OnboardingRouter);
