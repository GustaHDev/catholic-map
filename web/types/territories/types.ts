import { Prisma } from "@/app/generated/prisma/client";
import { CreateTerritorySchema } from "@/schemas/territorySchema";
import z from "zod";

export type Territory = Prisma.territoriesGetPayload<{
    include: never
}>

export type CreateTerritoryInput = z.infer<typeof CreateTerritorySchema>