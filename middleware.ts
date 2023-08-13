// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { AccountType } from "./utils/constants/userRoles";
// paths that require authentication or authorization
const authPaths: string[] = [
    "/admin/login",
    "/admin/register",
    "/seller/login",
    "/seller/register",
    "/buyer/login",
    "/buyer/register",
];
const adminPath = "/admin";
const sellerPath = "/seller";
const buyerPath = "/buyer";
const profilePath = "/profile";
const requireAuthPaths = [adminPath, sellerPath, buyerPath, profilePath];
const userPaths = [sellerPath, buyerPath];
export async function middleware(request: NextRequest) {
    const res = NextResponse.next();
    const pathname = request.nextUrl.pathname;

    const token = await getToken({
        req: request,
        secret: process.env.SECRET,
    });

    if (authPaths.some((path) => pathname.startsWith(path))) {
        // prevent logged user from accessing auth paths

        if (token) {
            const dashboardPath = pathname.substring(
                0,
                pathname.lastIndexOf("/")
            );

            const url = new URL(dashboardPath);

            return NextResponse.redirect(url);
        }
        return res;
    }

    if (token) {
        const authorizedForAdmin =
            pathname.startsWith(adminPath) && !token.isAdmin;
        const authorizedForUser =
            userPaths.some((path) => pathname.startsWith(path)) &&
            !token.isUser;

        if (authorizedForAdmin || authorizedForUser) {
            const url = new URL(`/403`, request.url);
            return NextResponse.rewrite(url);
        }

        // BUYER AUTHORIZATION
        else if (pathname.startsWith(buyerPath)) {
            const buyerAccount = token.accounts.find(
                (account) => account.type == AccountType.buyer
            );
            if (buyerAccount && pathname.startsWith(`/buyer/link-account`)) {
                // const url = new URL(`/buyer`);
                const url = new URL(`/buyer`, request.url);

                return NextResponse.redirect(url);
            } else if (!buyerAccount) {
                const url = new URL(`/buyer/link-account`, request.url);
                return NextResponse.rewrite(url);
            }
        }

        // SELLER AUTHORIZATION
        else if (pathname.startsWith(sellerPath)) {
            const sellerAccount = token.accounts.find(
                (account) => account.type == AccountType.seller
            );
            if (sellerAccount && pathname.startsWith(`/seller/link-account`)) {
                // const url = new URL(`/seller`);
                const url = new URL(`/seller`, request.url);

                return NextResponse.redirect(url);
            } else if (!sellerAccount) {
                const url = new URL(`/seller/link-account`, request.url);
                return NextResponse.rewrite(url);
            }
        }
    } else if (requireAuthPaths.some((path) => pathname.startsWith(path))) {
        const url = new URL(`/login`, request.url);
        url.searchParams.set("callbackUrl", encodeURI(request.url));
        return NextResponse.redirect(url);
    }

    return res;
}
