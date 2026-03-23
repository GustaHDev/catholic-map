import { EntityRepository } from "@/repositories/entityRepository";
import { ReligionRepository } from "@/repositories/religionRepository";
import { CreateReligionInput, Religion } from "@/types/religions/types";

const religionRepository: ReligionRepository = new ReligionRepository();
const entityRepository: EntityRepository = new EntityRepository();

export class ReligionService {
    public async createReligion(data: CreateReligionInput, entity_id: string): Promise<Religion> {

        const entityExists = await entityRepository.findEntityById(entity_id);
        if (!entityExists) {
            throw new Error("Entity not found");
        }

        const religionExists = await religionRepository.findReligion(data.religion, entity_id, data.start_year);
        if (religionExists) {
            throw new Error("Entity already has this religion in this year");
        }

        return await religionRepository.createReligion(data, entity_id);
    }

    public async findReligionByName(religion: string): Promise<Religion | null> {
        return await religionRepository.findReligionByName(religion);
    }
}