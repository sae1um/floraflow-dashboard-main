import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { greenhouses } from "./greenhousesSchema";
import { timestamp } from "drizzle-orm/pg-core";
import { numeric } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";

// TODO Add Light level to readings schema 

export const greenhouseReadings = pgTable("greenhouseReadings", {
    id: uuid("id").defaultRandom().primaryKey(), //reading id != greenhouse id, identifies each reading
    greenhouseId: varchar("greenhouse_id", { length: 36 }).references(
        () => greenhouses.id
    ),
    temperature: numeric("temperature", { precision: 5, scale: 2 }),
    humidity: numeric("humidity", { precision: 5, scale: 2 }),
    co2: integer("co2"),
    waterLevel: numeric("water_level", { precision: 5, scale: 2 }),
    timestamp: timestamp("timestamp").notNull().defaultNow(),
});
