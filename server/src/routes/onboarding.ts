import { Router } from "express";
import { clerkClient } from "@clerk/express";
import userSettings from "../lib/userSettings.json"
export const router = Router();

// CLERK_PUBLISHABLE_KEY
// CLERK_SECRET_KEY
router.post("/set-onboarding", async (req, res) => {
    // Validation for request
    if (!req.body) {
        res.status(400).json({ error: "Body is required" });
    } else if (!req.body.userid.trim()) {
        res.status(400).json({ error: "userid is required" });
    }

    const { userid } = req.body;

    // Create onboarding Metadata
    // Create an empty settings array to store all preferences etc
    try {
        await clerkClient.users.updateUser(userid, {
            publicMetadata: {
                onboardingComplete: false,
                userSettings //from userSettings.json
            },
        });
        console.log("Onboarding Set successfully");
        return res.status(200).json({ response: "Onboarding set succesfully" });
    } catch (err: any) {
        console.log("Error updating metadata:", err.errors?.[0].longMessage);
        return res.status(500).json({
            error: "Metadata not set succesfully",
            advanced: err.errors?.[0].longMessage,
        });
    }
});

router.post("/done-onboarding", (req, res) => {
    
})
