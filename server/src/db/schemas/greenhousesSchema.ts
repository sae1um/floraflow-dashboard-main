import { text } from "drizzle-orm/pg-core";
import { boolean } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

/*
* When device made, greenhouse
*/
export const greenhouses = pgTable("greenhouses", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name"),
    room: text("room"),
    ownerId: text("ownerId"),
    isClaimed: boolean("isClaimed")
})