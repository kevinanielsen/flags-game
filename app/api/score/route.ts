import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
const jwt = require("jsonwebtoken");

interface IBody {
  score_count: number;
  user_name: string;
  seconds_spent: number;
}

export async function POST(req: NextRequest) {
  try {
    const requestHeaders = new Headers(req.headers);
    const authToken = requestHeaders.get("Authorization");

    if (!authToken) {
      return NextResponse.json({
        ok: false,
        status: 401,
        message: "Missing authorization",
      });
    }

    try {
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
      if (decoded !== "master") {
        return NextResponse.json({
          ok: false,
          status: 401,
          message: "Missing authorization",
        });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({
        ok: false,
        status: 401,
        message: "Missing authorization",
      });
    }

    const body: IBody = await req.json();
    const { score_count, user_name, seconds_spent } = body;

    if (!score_count) {
      return NextResponse.json({
        ok: false,
        status: 400,
        error: "Missing score_count in body",
      });
    }
    if (!user_name) {
      return NextResponse.json({
        ok: false,
        status: 400,
        error: "Missing user_name in body",
      });
    }
    if (!seconds_spent) {
      return NextResponse.json({
        ok: false,
        status: 400,
        error: "Missing seconds_spent in body",
      });
    }

    const dbEntry = await prisma.score.create({
      data: {
        score_count,
        user_name,
        seconds_spent,
      },
    });

    return NextResponse.json({ ok: true, status: 200, data: { dbEntry } });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: false, error });
  }
}
