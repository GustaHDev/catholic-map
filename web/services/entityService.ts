import { EntityRepository } from '@/repositories/entityRepository'
import { CreateEntityInput, Entity } from '@/types/entities/types';
import { EntityWithTerritories } from '@/types/entities/types';

const entityRepository: EntityRepository = new EntityRepository();

export class EntityService {

    public async createEntity(data: CreateEntityInput): Promise<Entity> {
        const entityExists = await entityRepository.findEntityByName(data.name);

        if (entityExists) {
            throw new Error("Entity already exists.");
        }

        return await entityRepository.createEntity(data);
    }

    public async findEntityByYear(year: number): Promise<EntityWithTerritories[]> {
        if (!year || isNaN(year)) {
            throw new Error('Invalid year');
        }

        const entities: EntityWithTerritories[] = await entityRepository.findEntityByYear(year);

        return entities;
    }
}