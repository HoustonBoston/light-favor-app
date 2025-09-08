import { NextRequest, NextResponse } from "next/server";
import { get_parts } from "../../../../backend-db/part/get_parts";

export default async function POST(req: NextRequest)   {
    const json = await req.json();
    const dayjob_id = json.dayjob_id;
    const result = await get_parts(dayjob_id)
    return NextResponse.json(result)
}