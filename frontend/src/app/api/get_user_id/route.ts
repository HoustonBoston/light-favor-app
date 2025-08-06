import { NextResponse, NextRequest } from "next/server";
import { upsert_user } from "../../../../backend-db/db";

export async function GET (request: NextRequest)
{
    const body = await request.json()
    const result = await upsert_user(body)
    return NextResponse.json(result)
}
