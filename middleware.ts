// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// paths that require authentication or authorization
const requireAuth: string[] = ["/dashboard"];
const adminAuth: string[] = ["/admin"];
export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  if (requireAuth.some((path) => pathname.startsWith(path))) {
    const token = await getToken({
      req: request,
      secret: process.env.SECRET,
    });
    //check not logged in
    if (!token) {
      const url = new URL(`/login`, request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    // //check if not authorized
    if (!token.isUser) {
      const url = new URL(`/403`, request.url);
      return NextResponse.rewrite(url);
    }
  }

  if (adminAuth.some((path) => pathname.startsWith(path))) {
    const token = await getToken({
      req: request,
      secret: process.env.SECRET,
    });
    //check not logged in
    if (!token) {
      const url = new URL(`/login`, request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    //check if not authorized
    if (!token.isAdmin) {
      const url = new URL(`/403`, request.url);
      return NextResponse.rewrite(url);
    }
  }
  return res;
}
