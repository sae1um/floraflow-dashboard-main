const express = require("express");
const { clerkClient } = require("@clerk/express");

const router = express();

// CLERK_PUBLISHABLE_KEY
// CLERK_SECRET_KEYs
router.post("/set-onboarding", async (req, res) => {
    if (!req.body) {
        res.status(400).json({ error: "Body is required" });
    } else if (!req.body.userid.trim()) {
        res.status(400).json({ error: "userid is required" });
    }

    console.log("request received");
    const { userid, onboardingType } = req.body;

    try {
        await clerkClient.users.updateUser(userid, {
            publicMetadata: {
                onboardingComplete: false,
            },
        });
        console.log("Onboarding Set successfully");
        return res.status(200).json({ repsonse: "Onboarding set succesfully" });
    } catch (err) {
        console.log("Error updating metadata:", err.errors?.[0].longMessage);
        return res.status(500).json({
            error: "Metadata not set succesfully",
            advanced: err.errors?.[0].longMessage,
        });
    }
});

router.post("/done-onboarding", (req, res) => {
    
})

module.exports = router;
