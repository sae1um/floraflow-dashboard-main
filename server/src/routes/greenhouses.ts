import {
    claimOnboardingGreenhouse,
    updateOnboardingGreenhouse,
    claimGreenhouse,
    initialiseGreenhouse,
} from "../db/queries/greenhouse";

import { Router } from "express";
export const router = Router();

router.post("/claim", async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: "Body is required" });
    }
    const { deviceId, username, userId } = req.body;

    if (!deviceId.trim() || !username.trim() || !userId.trim()) {
        return res.status(400).send("Missing fields");
    }
    const response = await claimOnboardingGreenhouse(deviceId, username, userId);
    if (!response.success) {
        return res.status(400).send(response);
    }
    return res.status(200).send(response);
});

router.post("/update-claim", async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: "Body is required" });
    }
    const { deviceId, location, room } = req.body;

    if (!room.trim()) {
        return res
            .status(400)
            .send({ success: false, message: "Please enter a room name" });
    }
    const response = await updateOnboardingGreenhouse(deviceId, location, room);
    if (!response.success) {
        return res.status(400).send(response);
    }
    return res.status(200).send(response);
});

router.post("/new-dashboard-claim", async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: "Body is required" });
    }
    console.log("Endpoint hit",req.body);

    const { deviceId, name, location, room, userId } = req.body;

    const response = await claimGreenhouse(deviceId, name, location, room, userId);
    if (!response.success) {
        return res.send(response);
    }
    return res.status(200).send(response);
});


router.post("/initialise", async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: "Body is required" });
    }
    const { greenhouseId } = req.body;

    if (!greenhouseId.trim()) {
        return res.status(400).send("No greenhouse ID provided");
    }
    // Remove line terminator
    const id = greenhouseId.replace("\x00", "");
    //Check if ID follows rules
    if (!idRules(id)) {
        return res.status(400).send("Invalid greenhouse ID");
    }

    try {
        const response = await initialiseGreenhouse(id);
        if (response.initialised) {
            return res.status(200).send("Greenhouse succesfully initialised");
        }
        return res.status(200).send("Greenhouse already exists");
    } catch (error) {
        return res.status(500).send("There has been an issue");
    }
});

function idRules(id: string) {
    const splitId = id.split("-");
    if (splitId[0] != "GH") {
        return false;
    }
    if (splitId[1].length < 12) {
        return false;
    }else if (splitId[1].length > 12) {
        return false;
    }
    return true;
}
