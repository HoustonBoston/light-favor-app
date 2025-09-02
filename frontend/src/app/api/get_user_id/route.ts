import { NextResponse, NextRequest } from "next/server";
import { save_dayjob_info } from "../../../../backend-db/dayjob/save_dayjob_info";

export async function POST (request: NextRequest)  // allows for content to arrive in the body
{
    const body = await request.json()
    const result = await save_dayjob_info(body)
    return NextResponse.json(result)
}
