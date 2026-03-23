import { prisma } from '@/lib/prisma'
import { CreateEntityInput } from '@/types/entities/types';
import { Entity, EntityWithTerritories } from '@/types/entities/types';

export class EntityRepository {

    public async createEntity(data: CreateEntityInput): Promise<Entity> {
        return await prisma.historical_entities.create({
            data: data
        });
    }

    public async findEntityByName(name: string): Promise<Entity | null> {
        return await prisma.historical_entities.findFirst({
            where: { name }
        });
    }

    public async findEntityById(id: string): Promise<Entity | null> {
        return await prisma.historical_entities.findFirst({
            where: { id }
        })
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