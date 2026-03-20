import { prisma } from '@/lib/prisma'
import { CreateEntityInput } from '@/types/map/types';
import { Entity, EntityWithTerritories } from '@/types/map/types';

export class EntityRepository {

    public async createEntity(data: CreateEntityInput) {
        return await prisma.historical_entities.create({
            data: data
        });
    }

    public async findEntity(name: string): Promise<Entity | null> {
        return await prisma.historical_entities.findFirst({
            where: { name }
        });
    }

    public async findEntityByYear(year: number): Promise<EntityWithTerritories[]> {
        return await prisma.historical_entities.findMany({
            where: {
                start_year: { lte: year },
                end_year: { gte: year }
            },
            include: {
                entities_territories: {
                    where: {
                        start_year: { lte: year },
                        end_year: { gte: year }
                    }
                },
                entities_religions: {
                    where: {
                        start_year: { lte: year },
                        end_year: { gte: year }
                    }
                }
            }
        });
    }
}