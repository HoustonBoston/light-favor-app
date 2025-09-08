import { NextRequest, NextResponse } from "next/server";
import { update_part } from "../../../../backend-db/part/update_part";

export async function POST(req: NextRequest)   {
    const json = await req.json();
    const part = json.part;
    const result = await update_part(part)
    return NextResponse.json(result)
}
