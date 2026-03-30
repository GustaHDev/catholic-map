import { CreateEntitySchema } from "@/schemas/entitySchema";
import { EntityService } from "@/services/entityService";
import { NextResponse } from "next/server";

const entityService = new EntityService();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("RAW BODY:", body)

    const validated = CreateEntitySchema.safeParse(body);

    if (!validated.success) {
      console.log("ZOD ERROR:", validated.error.flatten())

      return NextResponse.json(
        { error: validated.error.flatten() },
        { status: 422 }
      )
    }

    const data = await entityService.createEntity(validated.data);

    return NextResponse.json(data, { status: 201 },);
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`)
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