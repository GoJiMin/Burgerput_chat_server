import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:3000",
  process.env.BURGERPUT_SITE_1,
  process.env.BURGERPUT_SITE_2,
];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/") {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth/signin`);
    }

    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith("/api/entrance")) {
    const origin = req.headers.get("origin") ?? "";
    const isAllowedOrigin = allowedOrigins.includes(origin);

    const isPreflight = req.method === "OPTIONS";

    if (isPreflight) {
      const preflightHeaders = {
        ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
        ...corsOptions,
      };

      return NextResponse.json({}, { headers: preflightHeaders });
    }

    const res = NextResponse.next();

    if (isAllowedOrigin) {
      res.headers.set("Access-Control-Allow-Origin", origin);
    }

    Object.entries(corsOptions).forEach(([key, value]) => {
      res.headers.set(key, value);
    });

    return res;
  }
}
