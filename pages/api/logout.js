// import { cookies } from "next/headers";
import { serialize } from "cookie";
export default async function handler(req, res) {
  /* remove cookies from request header */
  // cookies().delete("bearerToken");
  // res.json({});
  // res.setHeader(
  //   "Set-Cookie",
  //   "bearerToken=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
  // );
  // res.end();
  res.setHeader("Set-Cookie", [
    serialize("bearerToken", "", {
      maxAge: -1,
      path: "/",
    }),
  ]);
  // res.writeHead(302);
  res.end();
  // res.cookies.set("bearerToken", "", {
  //   httpOnly: true,
  //   maxAge: 0, // 0 second hours in seconds
  // });
}
