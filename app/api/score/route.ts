import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface IBody {
  score_count: number;
  user_name: string;
  seconds_spent: number;
}

type ResponseData = {
  message: string;
};

export async function POST(req: NextRequest) {
  try {
    const body: IBody = await req.json();
    const { score_count, user_name, seconds_spent } = body;

    if (score_count === null || score_count === undefined) {
      return NextResponse.json("Missing score_count in body", { status: 400 });
    }
    if (!user_name) {
      return NextResponse.json("Missing user_name in body", { status: 400 });
    }
    if (!seconds_spent) {
      return NextResponse.json("Missing seconds_spent in body", {
        status: 400,
      });
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
