import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { greenhouses } from "./greenhousesSchema";
import { timestamp } from "drizzle-orm/pg-core";
import { numeric } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";

export const greenhouseReadings = pgTable("greenhouseReadings", {
    id: uuid("id").defaultRandom().primaryKey(),
    greenhouseId: uuid("greenhouse_id").references(() => greenhouses.id),
    timestamp: timestamp("timestamp").notNull().defaultNow(),
    temperature: numeric("temperature", { precision: 5, scale: 2 }),
    humidity: numeric("humidity", { precision: 5, scale: 2 }),
    co2: integer("co2"),
    waterLevel: numeric("water_level", { precision: 5, scale: 2 }),
});
