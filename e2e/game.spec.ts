import TCountry from "@/types/Country";
import { test, expect } from "@playwright/test";
const flags = require("../public/flags.json");

test("start game link", async ({ page }) => {
  await page.goto("/");
  await page.getByText("Start Game").click();
  await expect(page).toHaveURL("/game");
});

test("submit guess button", async ({ page }) => {
  await page.goto("/game");
  await expect(page.getByText("Submit Guess")).toBeVisible();
  const flagSvg = await page.getByAltText("Random Flag").getAttribute("src");

  const flagName = flags.find((f: TCountry) => f.flagSvg === flagSvg)?.country;

  if (flagName) await page.getByLabel("Guess").fill(flagName[0]);
  await page.getByText("Submit Guess").click();
  expect(await page.getByAltText("Random Flag").getAttribute("src")).not.toBe(
    flagSvg,
  );
});
