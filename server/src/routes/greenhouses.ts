import { Router } from "express";
export const router = Router();

router.post("/claim", (req, res) => {
    res.send("Claim a greenhouse");  
});

router.post("/initialise", (req, res) => {
    const { greenhouseId } = req.body;

    if(!greenhouseId.trim()){
        return res.status(400).send("No greenhouse ID provided");
    }
    const id = greenhouseId.replace("\x00", "");
    //Check if ID follows rules
    if(!idRules(id)){
        return res.status(400).send("Invalid greenhouse ID");
    }
    // If valid, check if already in db
    // if not then store in db
    // console.log("Gh id is: " + id);
    return res.status(200).send("Greenhouse initialised");
});

function idRules(id: string){
    const splitId = id.split("-");
    if(splitId[0] != "GH"){
        return false;
    }
    if(splitId[1].length < 8){
        return false;
    }
    return true;
}