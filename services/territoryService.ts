import { TerritoryRepository } from "@/repositories/territoryRepository";
import { CreateTerritoryInput, Territory } from "@/types/territories/types";

const territoryRepository: TerritoryRepository = new TerritoryRepository();

export class TerritoryService {
    public async createTerritory(data: CreateTerritoryInput): Promise<Territory> {
        const territoryExists = await territoryRepository.findTerritoryByName(data.name);

        if (territoryExists) {
            throw new Error("Territory already exists");
        }
        return await territoryRepository.createTerritory(data);
    }

    public async findTerritoryById(id: string): Promise<Territory | null> {
        return await territoryRepository.findTerritoryById(id);
    }
}