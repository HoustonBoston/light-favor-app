import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware (request: NextRequest)
{
    if (request.cookies.has('jwtLogin'))
        return NextResponse.next()

    return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
    matcher: [
        '/((?!$).*)', // Matches everything except the root "/"
    ],
}
