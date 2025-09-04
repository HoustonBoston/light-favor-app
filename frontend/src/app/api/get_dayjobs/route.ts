import { NextRequest, NextResponse } from "next/server";
import { get_dayjobs } from "../../../../backend-db/dayjob/get_dayjobs";

export async function POST (request: NextRequest) {
    const body = await request.json()
    const result = await get_dayjobs(body.user_id)  // body contains user_id
    return NextResponse.json(result)
}
