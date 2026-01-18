import * as z from "zod";

export const greenhouseSchema = z.object({
    name: z.string().min(2, "Name must be atleast 2 characters"),
    location: z.string().min(2, "Location must be atleast 2 characters"),
    room: z.string().min(2, "Location must be atleast 2 characters").optional(),
    deviceId: z.string().min(8, "Device ID must be at least 8 characters"),
});
