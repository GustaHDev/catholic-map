import { AssignEntityToTerritorySchema } from "@/schemas/entitiesTerritoriesSchema";
import { EntitiesTerritoriesService } from "@/services/entitiesTerritoriesService";
import { NextResponse } from "next/server";

const entitiesTerritoriesService: EntitiesTerritoriesService = new EntitiesTerritoriesService();

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const validated = AssignEntityToTerritorySchema.safeParse(body);

        if (!validated.success) {
            return NextResponse.json(
                { error: validated.error.flatten() },
                { status: 422 }
            );
        }

        const data = await entitiesTerritoriesService.assignTerritoryToEntity(validated.data, id);

        return NextResponse.json(
            data,
            { status: 201 }
        )
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ entityId: string }> }
) {
    try {
        const { searchParams } = new URL(req.url);
        const territoryId = searchParams.get('territory_id');
        const startYear = Number(searchParams.get('start_year'));
        const { entityId } = await params;

        if (!territoryId) {
            throw new Error("territory_id cannot be null");
        }

        if (!startYear) {
            throw new Error("start_year cannot be null");
        }

        const data = await entitiesTerritoriesService.checkTerritoryAssigned(entityId, territoryId, startYear);

        if (data == null) {
            throw new Error("Assignment not found.")
        }

        return NextResponse.json(data);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
