import { text } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { users } from "./usersSchema";
import { timestamp } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";

/*
 * When device made, greenhouse sends 
 */
export const greenhouses = pgTable("greenhouses", {
    id: varchar("id", {length: 36}).primaryKey(),
    name: text("name"),
    room: text("room"),
    location: text("location"),
    ownerId: text("ownerId").references(() => users.id),
    claimedAt: timestamp("claimed_at"),
    createdAt: timestamp("created_at").notNull().defaultNow()
});
