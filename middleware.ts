import newRateLimit from "@/lib/ratelimit";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

const ratelimit = newRateLimit();

export async function middleware(request: NextRequest) {
  const headersList = headers();
  const ip = headersList.get("x-forwarded-for") ?? "127.0.0.1";

  const { success, reset } = await ratelimit.limit(ip);

  if (!success) {
    const now = Date.now();
    const retryAfter = Math.floor((reset - now) / 1000);
    return new NextResponse(`Too many requests. IP: ${ip}`, {
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
