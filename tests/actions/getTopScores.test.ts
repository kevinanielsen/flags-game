import getTopScores from "@/app/actions/getTopScores";
import { describe, test, expect } from "vitest";

describe("getTopScores function", () => {
  test("Returns the best score at index 0", () => {
    const expected = {
      score_id: "654bf0264ee46b3abe02802d",
      score_count: 191,
      user_name: "TOP_SCORE",
      created_at: "2023-11-10T12:50:04.146Z",
      seconds_spent: 1,
    };

    getTopScores().then((response) => {
      if (response instanceof Array) {
        const result = response[0];

        expect(expected.score_id).toBe(result.score_id);
      }
    });
  });
});
