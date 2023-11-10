import getTopScores from "@/app/actions/getTopScores";

test("getTopScores function", async () => {
  const expected = {
    score_id: "654bf0264ee46b3abe02802d",
    score_count: 191,
    user_name: "TOP_SCORE",
    created_at: "2023-11-10T12:50:04.146Z",
    seconds_spent: 1,
  };

  const response = await getTopScores();
  if (response instanceof Array) {
    const result = response[0];

    expect(expected.score_id).toBe(result.score_id);
  }
});
