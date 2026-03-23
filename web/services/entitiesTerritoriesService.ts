import { EntitiesTerritoriesRepository } from "@/repositories/entitiesTerritoriesRepository";
import { EntityRepository } from "@/repositories/entityRepository";
import { TerritoryRepository } from "@/repositories/territoryRepository";
import { AssignTerritoryToEntityInput, TerritoryAssigned } from "@/types/entitiesTerritories/types";

const entitiesTerritoriesRepository: EntitiesTerritoriesRepository = new EntitiesTerritoriesRepository();
const entityRepository: EntityRepository = new EntityRepository();
const territoryRepository: TerritoryRepository = new TerritoryRepository();

export class EntitiesTerritoriesService {
    public async assignTerritoryToEntity(data: AssignTerritoryToEntityInput, entity_id: string): Promise<TerritoryAssigned> {
        const isTerritoryAssigned = await entitiesTerritoriesRepository.checkTerritoryAssigned(entity_id, data.territory_id, data.start_year);
        const entityExists = await entityRepository.findEntityById(entity_id);
        const territoryExists = await territoryRepository.findTerritoryById(data.territory_id);

        if (isTerritoryAssigned) {
            throw new Error("This territory is already assigned to this entity in this period");
        }

        if (!entityExists) {
            throw new Error("Entity not found");
        }

        if (!territoryExists) {
            throw new Error("Territory not found");
        }

        return await entitiesTerritoriesRepository.assignTerritoryToEntity(data, entity_id);
    }

    public async checkTerritoryAssigned(entity_id: string, territory_id: string, start_year: number): Promise<TerritoryAssigned | null> {
        return await entitiesTerritoriesRepository.checkTerritoryAssigned(entity_id, territory_id, start_year);
    }
}