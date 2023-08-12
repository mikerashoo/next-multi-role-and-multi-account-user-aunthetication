// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { AccountType } from "./utils/constants/userRoles";
// paths that require authentication or authorization
const authPaths: string[] = ["/admin/login", "/admin/register", "/seller/login", "/seller/register", "/buyer/login", "/buyer/register",  ];
const adminPath = "/admin"; 
const sellerPath = "/seller"; 
const buyerPath = "/buyer"; 
export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  const token = await getToken({
    req: request,
    secret: process.env.SECRET,
  });

  // IF USER IS LOGGED AND TRIED TO REGISTER OR LOGGED IN REDIRECT TO DASHBOARD
  if (authPaths.some((path) => pathname.startsWith(path))) {
    if(token){
    const dashboardPath = pathname.substring(0, pathname.lastIndexOf("/"));

      const url = new URL(dashboardPath);
      
      return NextResponse.redirect(url);
    }
    return res;
  }
  
  // IF USER IS UNAUTHENTICATED REDIRECT TO LOGIN
  else if(!token)  { 
    const url = new URL(`/login`, request.url);
    url.searchParams.set("callbackUrl", encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  // SHOW UNAUTHORIZED MESSAGE FOR WRONG ROLES
  if(!token.isAdmin && pathname.startsWith(adminPath) || !token.isUser && (pathname.startsWith(sellerPath) || pathname.startsWith(buyerPath))) {
      const url = new URL(`/403`, request.url);
      return NextResponse.rewrite(url);
  } 

  // BUYER AUTHORIZATION 
  if(pathname.startsWith(buyerPath)){
    const buyerAccount = token.accounts.find((account) => account.type == AccountType.buyer);
    if(buyerAccount && pathname.startsWith(`/buyer/link-account`)){
      // const url = new URL(`/buyer`);
      const url = new URL(`/buyer`, request.url);

      return NextResponse.redirect(url);
    }
      else if(!buyerAccount){
      const url = new URL(`/buyer/link-account`, request.url);
      return NextResponse.rewrite(url);
    }
  }
 

  // SELLER AUTHORIZATION 
  if(pathname.startsWith(sellerPath)){

    const sellerAccount = token.accounts.find((account) => account.type == AccountType.seller);
    if(sellerAccount && pathname.startsWith(`/seller/link-account`)){
      // const url = new URL(`/seller`);
      const url = new URL(`/seller`, request.url);

      return NextResponse.redirect(url);
    }
      else if(!sellerAccount){
      const url = new URL(`/seller/link-account`, request.url);
      return NextResponse.rewrite(url);
    }
}

  return res;
}


export const config = {
  matcher: [
    '/profile',
    '/dashboard/:path*',
    '/admin/:path*',
    '/seller/:path*', 
    '/buyer/:path*', 
    // '/((?!buyer/login|seller/login).*)',
  ]
}