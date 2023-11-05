import newRateLimit from "@/lib/ratelimit";
import { NextRequest, NextResponse } from "next/server";

const ratelimit = newRateLimit();

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? "";
  const { success, reset } = await ratelimit.limit(ip);

  if (!success) {
    const now = Date.now();
    const retryAfter = Math.floor((reset - now) / 1000);
    return new NextResponse("Too many requests", {
      status: 429,
      headers: {
        ["retry-after"]: `${retryAfter}`,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
