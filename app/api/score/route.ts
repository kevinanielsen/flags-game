import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface IBody {
  score_count: number;
  user_name: string;
  seconds_spent: number;
}

export async function POST(req: NextRequest) {
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
