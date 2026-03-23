import { z } from "zod"

export const CreateReligionSchema = z.object({
    start_year: z.number().int(),
    end_year: z.number().int(),
    religion: z.string().min(3).max(100),
}).refine(data => data.end_year > data.start_year, {
    message: 'end_year must be greater than start_year',
    path: ['end_year']
})