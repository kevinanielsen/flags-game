import getTimeSpent from "@/app/actions/getTimeSpent";

describe("getTimeSpent function", () => {
  it("returns time in hours", () => {
    const expected = { hours: 2, minutes: 0, seconds: 0 };
    const result = getTimeSpent(7200);

    expect(result.hours).toBe(expected.hours);
  });
});
