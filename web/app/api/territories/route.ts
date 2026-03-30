import { CreateTerritorySchema } from "@/schemas/territorySchema";
import { TerritoryService } from "@/services/territoryService";
import { NextResponse } from "next/server";

const territoryService: TerritoryService = new TerritoryService();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log(`body received: ${body}`)
        const validated = CreateTerritorySchema.safeParse(body);

        if (!validated.success) {
            console.log(`error ${JSON.stringify(validated.error.flatten())}`)
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
            console.log(`error: ${JSON.stringify(error)}`)
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }
        console.log(`error: ${JSON.stringify(error)}`)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const country_code = searchParams.get("country_code")

        if (!country_code) {
            throw new Error("The country code cannot be null");
        }

        const data = await territoryService.findTerritoryByCountryCode(country_code)

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