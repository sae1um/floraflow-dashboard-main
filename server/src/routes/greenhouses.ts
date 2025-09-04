import { Router } from "express";
export const router = Router();

router.post("/claim", (req, res) => {
    res.send("Claim a greenhouse");  
});