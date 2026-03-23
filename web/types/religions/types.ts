import { Prisma } from "@/app/generated/prisma/client";
import { CreateReligionSchema } from "@/schemas/religionSchema";
import { z } from "zod";

export type ReligionWithEntities = Prisma.entities_religionsGetPayload<{
    include: {
        entity: true
    }
}>

export type Religion = Prisma.entities_religionsGetPayload<{
    include: never
}>

export type CreateReligionInput = z.infer<typeof CreateReligionSchema>