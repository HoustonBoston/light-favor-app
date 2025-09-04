import { NextResponse, NextRequest } from "next/server";
import { get_user_id } from "../../../../backend-db/user/upsert_user";

export async function POST (request: NextRequest)  // allows for content to arrive in the body
{
    const body = await request.json()
    const result = await get_user_id(body.user_email)
    return NextResponse.json(result)
}
