import { NextResponse, NextRequest } from "next/server";
import { delete_dayjob } from "../../../../backend-db/dayjob/delete_dayjob";

export async function POST(req: NextRequest)   {
    const json = await req.json();
    const dayjob_id = json.dayjob_id;
    if (typeof dayjob_id !== 'number') {
        return NextResponse.json({ success: false, error: 'Invalid or missing dayjob_id' }, { status: 400 });
    }
    const result = await delete_dayjob(dayjob_id);
    return NextResponse.json(result);
}
