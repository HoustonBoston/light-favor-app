import { NextResponse, NextRequest } from "next/server";
import { upsert_user } from "../../../../backend-db/db";

export async function POST (request: NextRequest)  // allows for content to arrive in the body
{
    const body = await request.json()
    const result = await upsert_user(body)
    return NextResponse.json(result)
}
