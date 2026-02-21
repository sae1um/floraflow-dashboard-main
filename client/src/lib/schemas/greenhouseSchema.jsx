import * as z from "zod";

export const greenhouseSchema = z.object({
    name: z.string().min(2, "Name must be atleast 2 characters"),
    location: z.string().optional(),
    room: z.string().min(2, "Location must be atleast 2 characters"),
    deviceId: z.string().min(15, "Device ID must be at least 12 characters").max(15, "Device ID must be at most 12 characters").regex(/^GH-[A-Z0-9]+$/, "Device ID does not match required format"),
});
