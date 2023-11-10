import prisma from "@/lib/prisma";

const getTopScores = async () => {
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

    return sortedScores;
  }
};

export default getTopScores;
