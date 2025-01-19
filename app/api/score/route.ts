import prisma from "@/lib/prisma";
import newRateLimit from "@/lib/ratelimit";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface IBody {
  score_count: number;
  user_name: string;
  seconds_spent: number;
}

const ratelimit = newRateLimit(2, 20);

export async function POST(req: NextRequest) {
  const headersList = await headers();
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
  try {
    const body: IBody = await req.json();
    const { score_count, user_name, seconds_spent } = body;

    if (score_count === null || score_count === undefined) {
      return new NextResponse("MISSING_SCORE_COUNT_IN_BODY", { status: 400 });
    }
    if (!user_name) {
      return new NextResponse("MISSING_USERNAME_IN_BODY", { status: 400 });
    }
    if (!seconds_spent) {
      return new NextResponse("MISSING_SECONDS_SPENT_IN_BODY", { status: 400 });
    }

    const dbEntry = await prisma.score.create({
      data: {
        score_count,
        user_name,
        seconds_spent,
      },
    });
    return NextResponse.json(dbEntry, { status: 200, statusText: "OK" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
