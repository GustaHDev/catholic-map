import { CreateTerritorySchema } from "@/schemas/territorySchema";
import { TerritoryService } from "@/services/territoryService";
import { NextResponse } from "next/server";

const territoryService: TerritoryService = new TerritoryService();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validated = CreateTerritorySchema.safeParse(body);

        if (!validated.success) {
            return NextResponse.json(
                { error: validated.error.flatten() },
                { status: 422 }
            );
        }

        const data = await territoryService.createTerritory(validated.data);

        return NextResponse.json(
            data,
            { status: 201 }
        );
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

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            throw new Error("Id cannot be null");
        }

        const data = await territoryService.findTerritoryById(id)

        if (data == null) {
            throw new Error("Territory not found");
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