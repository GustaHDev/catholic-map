import { Prisma } from '@/app/generated/prisma/client'
import { CreateEntitySchema } from '@/schemas/entitySchema'
import z from 'zod'

export type EntityWithTerritories = Prisma.historical_entitiesGetPayload<{
    include: {
        entities_territories: true
        entities_religions: true
    }
}>

export type Entity = Prisma.historical_entitiesGetPayload<{
    include: never
}>

export type CreateEntityInput = z.infer<typeof CreateEntitySchema>