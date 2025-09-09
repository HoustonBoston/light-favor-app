import { NextRequest, NextResponse } from "next/server";
import { delete_part } from "../../../../backend-db/part/delete_part";

export async function POST(request: NextRequest) {
    const json = await request.json();
    const part_id = json.part_id;
    const result = await delete_part(part_id);
    return NextResponse.json(result);
}
