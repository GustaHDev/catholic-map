import { CreateReligionSchema } from "@/schemas/religionSchema";
import { ReligionService } from "@/services/religionService";
import { NextResponse } from "next/server";

const religionService: ReligionService = new ReligionService();

export async function POST(
    req: Request,
    { params }: { params : Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const validated = CreateReligionSchema.safeParse(body);

        if (!validated.success) {
            return NextResponse.json(
                { error: validated.error.flatten() },
                { status: 422 }
            );
        }

        const data = await religionService.createReligion(validated.data, id);

        return NextResponse.json(`Religion saved successfully ${data}`, { status: 201 });
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
        const religion = searchParams.get('religion')?.toLowerCase();

        if (!religion) {
            throw new Error("Religion cannot be null");
        }
        const data = await religionService.findReligionByName(religion);

        if (data == null) {
            throw new Error("Religion not found.")
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