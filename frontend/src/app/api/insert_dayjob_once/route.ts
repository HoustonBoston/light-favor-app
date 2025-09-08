import { NextRequest, NextResponse } from "next/server";
import { insert_dayjob_once } from "../../../../backend-db/dayjob/save_dayjob_info";

export async function POST (req: NextRequest) {
    // expects minimal info: user_id
    // returns dayjob_id
    const body = await req.json();
    const result = await insert_dayjob_once(body.user_id);
    return NextResponse.json(result);
}
