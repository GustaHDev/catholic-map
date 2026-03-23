import { entities_territoriesGetPayload } from "@/app/generated/prisma/models";
import { AssignEntityToTerritorySchema } from "@/schemas/entitiesTerritoriesSchema";
import z from "zod";

export type EntitiesWithTerritories = entities_territoriesGetPayload<{
    include: {
        entities: true,
        territories: true
    }
}>

export type TerritoryAssigned = entities_territoriesGetPayload<{
    include: never
}>

export type AssignTerritoryToEntityInput = z.infer<typeof AssignEntityToTerritorySchema>