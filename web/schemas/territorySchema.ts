import { z } from "zod";

export const CreateTerritorySchema = z.object({
    name: z.string().min(2).max(100),
    country_code: z.string().min(2).max(100),
    continent: z.string().min(3).max(100).optional().nullable()
})