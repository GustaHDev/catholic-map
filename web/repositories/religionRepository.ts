import { prisma } from "@/lib/prisma";
import { CreateReligionInput, Religion, ReligionWithEntities } from "@/types/religions/types";

export class ReligionRepository {
    public async createReligion(data: CreateReligionInput, entity_id: string): Promise<Religion> {
        return await prisma.entities_religions.create({
            data: {
                start_year: data.start_year,
                end_year: data.end_year,
                religion: data.religion,
                entity_id: entity_id
            }
        });
    }

    public async findReligion(religion: string, entity_id: string, start_year: number): Promise<Religion | null> {
        return await prisma.entities_religions.findFirst({
            where: {
                religion,
                entity_id,
                start_year
            }
        });
    }

    public async findReligionByName(religion: string): Promise<Religion | null> {
        return await prisma.entities_religions.findFirst({
            where: { religion }
        });
    }
}