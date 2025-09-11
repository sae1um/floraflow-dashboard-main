import "dotenv/config";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import ws from "ws";

// DATABASE CONNECTION
neonConfig.webSocketConstructor = ws;

const sql = neon(process.env.NEON_DATABASE_URL!);
export const db = drizzle({ client: sql });
