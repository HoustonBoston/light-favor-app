import { NextRequest, NextResponse } from "next/server";
import { save_dayjob_info } from "../../../backend-db/db"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const result = await save_dayjob_info(body)
        return NextResponse.json({ success: true, result });  // object seen on the client side
    } catch(err: any) {
        console.error('error saving dayjob', err)
        return NextResponse.json(
            { success: false, error: err.message || 'Unknown error' },
            { status: 500 }
        )
    }
}

export async function GET(request: NextRequest) {
    
}
