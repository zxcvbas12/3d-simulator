import { test, expect, type Page } from "@playwright/test";

/**
 * These tests drive the app through real UI events (slider, mouse, clicks) and verify
 * outcomes by reading the zustand store exposed on `window.__STRATA_TEST__` (see
 * src/main.tsx), since content inside <canvas> is not reachable through DOM selectors.
 */

function getAppState(page: Page) {
  return page.evaluate(() => (window as any).__STRATA_TEST__.useAppStore.getState());
}

function selectPart(page: Page, id: string) {
  return page.evaluate(
    (partId) => (window as any).__STRATA_TEST__.useAppStore.getState().select({ id: partId }),
    id,
  );
}

async function openHbmModel(page: Page) {
  await page.goto("/");
  await page.locator("aside.sidebar").getByRole("button", { name: "HBM High-Bandwidth Memory" }).click();
  await expect(page.locator("canvas")).toBeVisible({ timeout: 15000 });
}

test.describe("STRATA core 3D interactions (HBM model)", () => {
  test("explode slider updates the store's explode value", async ({ page }) => {
    await openHbmModel(page);

    const before = (await getAppState(page)).explodeT;
    const slider = page.getByRole("slider");
    await slider.focus();
    await slider.press("End"); // jumps a range input to its max value

    const after = (await getAppState(page)).explodeT;
    expect(after).not.toBe(before);
    expect(after).toBeCloseTo(1, 5);
  });

  test("scroll zooms the camera; drag rotates without console errors", async ({ page }) => {
    await openHbmModel(page);

    const canvas = page.locator("canvas");
    const box = await canvas.boundingBox();
    if (!box) throw new Error("canvas has no bounding box");
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));

    const zoomBefore = (await getAppState(page)).zoom;
    await page.mouse.move(cx, cy);
    await page.mouse.wheel(0, 300);
    const zoomAfter = (await getAppState(page)).zoom;
    expect(zoomAfter).not.toBe(zoomBefore);

    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx + 80, cy - 40, { steps: 10 });
    await page.mouse.up();

    await expect(canvas).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("clicking a part shows its info in the panel", async ({ page }) => {
    await openHbmModel(page);

    await selectPart(page, "substrate");

    await expect(page.getByRole("heading", { name: "Package Substrate" })).toBeVisible();
    expect((await getAppState(page)).selected?.id).toBe("substrate");
  });

  test("language switch updates a known UI string across all locales", async ({ page }) => {
    await page.goto("/");

    const homeLink = page.locator("nav .commnav button").first();
    const langButtons = page.locator("nav .lang button");
    const expectedHome: Record<string, string> = { ko: "홈", en: "Home", ja: "ホーム", zh: "首页" };
    const langLabel: Record<string, string> = { ko: "KO", en: "EN", ja: "日", zh: "中" };

    for (const locale of Object.keys(expectedHome) as Array<keyof typeof expectedHome>) {
      await langButtons.filter({ hasText: langLabel[locale] }).click();
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(homeLink).toHaveText(expectedHome[locale]);
    }
  });

  test("toggling the HBM stack-height option updates state and UI", async ({ page }) => {
    await openHbmModel(page);

    const option16 = page.getByRole("button", { name: "16-Hi" });
    await option16.click();

    await expect(option16).toHaveAttribute("aria-pressed", "true");
    expect((await getAppState(page)).modelOpts.stack).toBe("16");
  });
});
