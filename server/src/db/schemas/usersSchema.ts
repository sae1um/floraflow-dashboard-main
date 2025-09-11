import { text } from "drizzle-orm/pg-core";
import { timestamp, pgTable } from "drizzle-orm/pg-core";

// New user record added on completion of onboarding
export const users = pgTable("users", {
    id: text("id").notNull().unique(), // Matches clerkId
    name: text("name").notNull(),
    role: text("role").default("None"),
    created_at: timestamp({ precision: 6, withTimezone: true }).defaultNow(),
});
