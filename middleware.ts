import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server"; // Import NextResponse
import { privateRoutes } from "./route";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const { nextUrl } = req;
    const url = "http://localhost:3000";
    const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
    const isAuthRoute = nextUrl.pathname.includes("/auth");
    const isApiRoute = nextUrl.pathname.includes("/api");

    if (isApiRoute) {
        return  // ✅ Always return a response
    }

    if (isLoggedIn && isAuthRoute) {
        return NextResponse.redirect(`${url}/dashboard`);
    }

    if (isAuthRoute && !isLoggedIn) {
        return  // ✅ Allow users to access auth pages
    }

    if (!isLoggedIn && isPrivateRoute) {
        return NextResponse.redirect(`${url}/auth/login`);
    }

    return  // ✅ Always return a response
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
