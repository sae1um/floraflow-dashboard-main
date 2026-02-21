import { eq } from "drizzle-orm";
import { db } from "../index";
import { greenhouses } from "../schemas/greenhousesSchema";
import { addNewUser } from "./users";

export async function initialiseGreenhouse(id: string) {
    const greenhouseExists = await db
        .select()
        .from(greenhouses)
        .where(eq(greenhouses.id, id));
    if (greenhouseExists.length === 0) {
        await db.insert(greenhouses).values({ id });
        return { initialised: true };
    }
    return { initialised: null };
}

export async function claimOnboardingGreenhouse(
    deviceId: string,
    username: string,
    userId: string
) {
    
    const userResp = await addNewUser(userId, username);
    try {
        const greenhouse = await db
            .select()
            .from(greenhouses)
            .where(eq(greenhouses.id, deviceId));
        if (greenhouse.length === 0) {
            return {
                success: false,
                message:
                    "Greenhouse not initialised. Make sure the device is plugged in and powered on.",
            };
        } else if (greenhouse[0].ownerId) {
            return { success: false, message: "Greenhouse already claimed" };
        } else {
            await db
                .update(greenhouses)
                .set({ ownerId: userId, claimedAt: new Date() })
                .where(eq(greenhouses.id, deviceId));
            return { success: true, message: "Device claimed successfully" };
        }
    } catch (error) {
        return { success: false, message: error, more: userResp };
    }
}

export async function updateOnboardingGreenhouse(
    deviceId: string,
    location: string,
    room: string
) {
    try{
        await db.update(greenhouses).set({room, location,}).where(eq(greenhouses.id, deviceId));
        return {success: true, message: "Greenhouse updated successfully"}
    }catch(err){
        return {success: false, message: "Failed to update greenhouse"}
    }

}

export async function claimGreenhouse(
    deviceId: string,
    name: string,
    location: string,
    room: string,
    userId: string
) {
    // const userResp = await addNewUser(userId);
    
    try {
        const greenhouse = await db
            .select()
            .from(greenhouses)
            .where(eq(greenhouses.id, deviceId));
        if (greenhouse.length === 0) {
            return {
                success: false,
                message:
                    "Greenhouse not initialised. Make sure the device is plugged in and powered on.",
            };
        } else if (greenhouse[0].ownerId) {
            return { success: false, message: "Greenhouse already claimed" };
        } else {
            await db
                .update(greenhouses)
                .set({ ownerId: userId, name, room, location,  claimedAt: new Date() })
                .where(eq(greenhouses.id, deviceId));
            return { success: true, message: "Device claimed successfully" };
        }
    } catch (error) {
        return { success: false, message: error };
    }
}