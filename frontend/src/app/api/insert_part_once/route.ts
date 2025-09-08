import { NextRequest, NextResponse } from "next/server";
import { insert_part_once } from "../../../../backend-db/part/save_parts";

export async function POST(req: NextRequest)   {
    const json = await req.json();
    const dayjob_id = json.dayjob_id;
    const part_id = json.part_id;
    const result = await insert_part_once(dayjob_id, part_id)
    return NextResponse.json(result)
}
