import { text } from "drizzle-orm/pg-core";
import { serial, timestamp, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    clerkId: text("clerkId").notNull().unique(),
    name: text("username"),
    created_at: timestamp({ precision: 6, withTimezone: true }),
    role: text("role").default("None"),
});
