import { NextResponse } from "next/server";
import * as jose from "jose";

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|assets|site).*)",
};

export async function middleware(req) {
  try {
    if (
      req.nextUrl.pathname.includes("/auth") ||
      req.nextUrl.pathname.includes("/payment") ||
      req.nextUrl.pathname.includes("/search")
    ) {
      return NextResponse.next();
    }
    if (!req.cookies.has("bearerToken")) {
      if (req.nextUrl.pathname.includes("/api")) {
        return new NextResponse(
          JSON.stringify({
            status: "unauthorized",
            message: "You are not logged in! Please log in to get access",
          }),
          {
            status: 401,
            headers: { "content-type": "application/json" },
          }
        );
      } else {
        const regex = /^(?!.*\/(?:product|customization))(?!\/$).*$/;
        if (regex.test(req.nextUrl.pathname)) {
          return NextResponse.redirect(new URL("/", req.url));
        }
      }
    } else {
      const decoded = await jose.jwtVerify(
        req.cookies.get("bearerToken").value,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      const res = NextResponse.next();
      res.headers.append("id", decoded.payload.id);
      return res;
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ success: false, message: error }),
      {
        status: 400,
        headers: { "content-type": "application/json" },
      }
    );
  }
}
