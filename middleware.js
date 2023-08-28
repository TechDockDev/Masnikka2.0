import { NextResponse } from "next/server";
import * as jose from "jose";

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:path*",
};

export async function middleware(req) {
  try {
    if (req.nextUrl.pathname.includes("/login")) {
      return NextResponse.next();
    }
    if (!req.cookies.has("bearerToken")) {
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

// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://localhost:3000",
//   "http://127.0.0.1:3000",
//   "http://192.168.29.249:3000",
//   "https://www.google.com",
// ];
// retrieve the current response
// const res = NextResponse.next();
// retrieve the HTTP "Origin" header
// from the incoming request
// const origin = req.headers.get("origin");
// if the origin is an allowed one,
// add it to the 'Access-Control-Allow-Origin' header
// if (allowedOrigins.includes(origin) || !origin) {
// res.headers.append("Access-Control-Allow-Origin", origin || "*");

// // add the remaining CORS headers to the response
// res.headers.append("Access-Control-Allow-Credentials", true);
// res.headers.append(
//   "Access-Control-Allow-Methods",
//   "GET,DELETE,PATCH,POST,PUT"
// );
// res.headers.append(
//   "Access-Control-Allow-Headers",
//   "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
// );
// res.headers.append("access-control-expose-headers", "Set-Cookie");
// return res;
