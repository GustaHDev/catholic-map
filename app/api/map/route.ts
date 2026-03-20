import { CreateEntitySchema } from '@/schemas/entitySchema';
import { EntityService } from '@/services/entityService'
import { NextResponse } from 'next/server'

const entityService = new EntityService();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const year = Number(searchParams.get('year'));

    const data = await entityService.findEntityByYear(year);

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