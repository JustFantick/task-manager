import { NextRequest, NextResponse } from "next/server";
import { updateSession, decrypt } from "../lib/auth-session";

export async function middleware(request: NextRequest) {
	const session = await request.cookies.get('session')?.value;
	const response = await updateSession(request);

	if (!response && request.nextUrl.pathname.startsWith('/profiles')) {
		return NextResponse.redirect(new URL('/', request.url));
	} else if (response && !request.nextUrl.pathname.startsWith('/profiles') && session) {
		const parsed = await decrypt(session);
		if (parsed.user.rememberUser === "on") {
			return NextResponse.redirect(new URL(`/profiles/${parsed.user.userId}`, request.url));
		}
	} else {
		return response;
	}
}

export const config = {
	matcher: ['/', '/profiles/:path*'],
}