import { users } from "../schemas/usersSchema";
import { db } from "../index";

export async function addNewUser(id: string, name: string) {
    try {
        await db.insert(users).values({ id, name });
        return { success: true, message: "User added successfully" };
    } catch (error) {
        console.error("Error inserting user:", error);
        if ((error as { code?: string }).code === "23505") {
            return { success: true, message: "User already exists" };
        }
        return { success: false, message: "Error adding user" };
    }
}