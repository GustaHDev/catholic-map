import { EntityRepository } from '@/repositories/entityRepository'
import { CreateEntityInput } from '@/types/map/types';
import { EntityWithTerritories } from '@/types/map/types';

const entityRepository: EntityRepository = new EntityRepository();

export class EntityService {

    public async createEntity(data: CreateEntityInput) {
        const entityExists = await entityRepository.findEntity(data.name);

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