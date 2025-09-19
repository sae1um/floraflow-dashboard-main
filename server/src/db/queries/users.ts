import { users } from "../schemas/usersSchema";
import { db } from "../index";
import { eq } from "drizzle-orm";
export async function addNewUser(id: string, name: string) {
    // Check if user already exists so then return
    try {
        const existingUser = await db.select().from(users).where(eq(users.id, id)).limit(1);
        if(existingUser.length > 0){
            return { success: true, message: "User already exists" };
        }
        await db.insert(users).values({ id, name });
        return { success: true, message: "User added successfully" };
    } catch (error) {
        // console.error("Error inserting user:", error);
        if ((error as { code?: string }).code === "23505") {
            return { success: true, message: "User already exists" };
        }
        return { success: false, message: "Error adding user" };
    }
}