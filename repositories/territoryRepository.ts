import { prisma } from "@/lib/prisma";
import { CreateTerritoryInput, Territory } from "@/types/territories/types";

export class TerritoryRepository {
    public async createTerritory(data: CreateTerritoryInput): Promise<Territory> {
        return await prisma.territories.create({
            data
        });
    }

    public async findTerritoryById(id: string): Promise<Territory | null> {
        return await prisma.territories.findFirst({
            where: { id }
        });
    }

    public async findTerritoryByName(name: string): Promise<Territory | null> {
        return await prisma.territories.findFirst({
            where: { name }
        });
    }
}