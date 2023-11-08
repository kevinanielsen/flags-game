import prisma from "@/lib/prisma";
import newRateLimit from "@/lib/ratelimit";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const ratelimit = newRateLimit(5, 20);

export async function GET() {
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
  try {
    const top_scores = await prisma.score.findMany({
      take: 100,
      orderBy: {
        score_count: "desc",
      },
    });

    if (top_scores) {
      const TopScores = top_scores.filter((score) => score.score_count === 193);

      const notTopScores = top_scores.filter(
        (score) => score.score_count !== 193,
      );

      const sortedTopScores = TopScores.sort(
        (a, b) => a.seconds_spent - b.seconds_spent,
      );

      const sortedScores = [...sortedTopScores, ...notTopScores];

      return NextResponse.json(sortedScores, { status: 200 });
    } else {
      return NextResponse.json({}, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
