import { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { AssignTerritoryToEntityInput, EntitiesWithTerritories, TerritoryAssigned } from "@/types/entitiesTerritories/types";

export class EntitiesTerritoriesRepository {
    public async assignTerritoryToEntity(data: AssignTerritoryToEntityInput, entity_id: string): Promise<TerritoryAssigned> {
        return await prisma.entities_territories.create({
            data: {
                territory_id: data.territory_id,
                start_year: data.start_year,
                end_year: data.end_year,
                percentage_controlled: data.percentage_controlled,
                geojson_boundary: data.geojson_boundary as Prisma.InputJsonValue,
                entity_id: entity_id
            }
        })
    }

    public async checkTerritoryAssigned(entity_id: string, territory_id: string, start_year: number): Promise<TerritoryAssigned | null> {
        return await prisma.entities_territories.findFirst({
            where: {
                entity_id,
                territory_id,
                start_year
            }
        })
    }
}