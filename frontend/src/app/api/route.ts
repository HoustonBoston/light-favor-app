import { NextRequest, NextResponse } from "next/server";
import { save_dayjob_info } from "../../../backend-db/db"

export async function GET(request: NextRequest) {
    return new NextResponse(JSON.stringify(save_dayjob_info()))
}

export async function POST(request: NextRequest) {
    
}
