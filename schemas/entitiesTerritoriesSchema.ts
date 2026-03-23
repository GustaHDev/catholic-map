import z from "zod";

export const AssignEntityToTerritorySchema = z.object({
    territory_id: z.string().min(2).max(100),
    start_year: z.number().int(),
    end_year: z.number().int(),
    percentage_controlled: z.number(),
    geojson_boundary: z.record(z.string(), z.unknown())
}).refine(data => data.end_year > data.start_year, {
    message: 'end_year must be greater than start_year',
    path: ['end_year']
});