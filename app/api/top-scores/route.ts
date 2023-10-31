import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
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
