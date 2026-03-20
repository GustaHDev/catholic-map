import { z } from "zod"

export const CreateEntitySchema = z.object({
    name: z.string().min(3).max(100),
    start_year: z.number().int(),
    end_year: z.number().int(),
    color: z.string().max(100).optional(),
    ai_generated: z.boolean(),
}).refine(data => data.end_year > data.start_year, {
    message: 'end_year must be greater than start_year',
    path: ['end_year']
})