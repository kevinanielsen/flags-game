import prisma from "@/lib/prisma";
import { TScore } from "@/types/Score";

const getTopScores: () => Promise<TScore[] | Error> = async () => {
  const top_scores = await prisma.score.findMany({
    take: 100,
    orderBy: {
      score_count: "desc",
    },
  });

  if (top_scores) {
    const TopScores: TScore[] = top_scores.filter(
      (score: TScore) => score.score_count === 193,
    );

    const notTopScores: TScore[] = top_scores.filter(
      (score: TScore) => score.score_count !== 193,
    );

    const sortedTopScores: TScore[] = TopScores.sort(
      (a: TScore, b: TScore) => a.seconds_spent - b.seconds_spent,
    );

    const sortedScores: TScore[] = [...sortedTopScores, ...notTopScores];

    return sortedScores;
  }

  return new Error("Error getting topScores");
};

export default getTopScores;
