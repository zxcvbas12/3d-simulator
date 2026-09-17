import { test, expect } from "@playwright/test";

test("homepage loads with the expected title and nav shell", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("STRATA — 3D 학습 시뮬레이터");
  await expect(page.getByRole("navigation")).toBeVisible();
});
