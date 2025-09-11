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

export async function claimGreenhouse(
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
            return { success: false, message: "Greenhouse not initialised" };
        } else if (greenhouse[0].ownerId) {
            return { success: false, message: "Greenhouse already claimed" };
        } else {
            await db
                .update(greenhouses)
                .set({ ownerId: userId, claimedAt: new Date() })
                .where(eq(greenhouses.id, deviceId));
            // console.log({ success: true, message: "Device claimed successfully" })
            return { success: true, message: "Device claimed successfully" };
        }
    } catch (error) {
        // console.error(error);
        return { success: false, message: error, more: userResp };
    }
}
