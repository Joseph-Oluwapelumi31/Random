import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const shotDir = path.join(__dirname, '..', 'verification', 'screenshots');

test.beforeAll(() => {
  fs.mkdirSync(shotDir, { recursive: true });
});

test('home: affiliation logos load (no broken image boxes)', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const slug = testInfo.project.name.replace(/[^a-z0-9-]+/gi, '-');
  await page.goto('/', { waitUntil: 'load', timeout: 90_000 });
  await page.waitForSelector('[data-testid="home-page"]', { state: 'visible', timeout: 60_000 });

  const row = page.locator('[aria-label="Affiliations"]');
  await expect(row).toBeVisible({ timeout: 30_000 });
  const imgs = row.locator('img');
  await expect(imgs).toHaveCount(3);

  for (let i = 0; i < 3; i++) {
    const natural = await imgs.nth(i).evaluate((el: HTMLImageElement) => ({
      w: el.naturalWidth,
      h: el.naturalHeight,
      complete: el.complete,
      src: el.currentSrc || el.src,
    }));
    expect(natural.complete, `img ${i} should finish loading`).toBe(true);
    expect(natural.w, `img ${i} naturalWidth should be > 0 (${natural.src})`).toBeGreaterThan(0);
    expect(natural.h, `img ${i} naturalHeight should be > 0`).toBeGreaterThan(0);
  }

  await row.screenshot({ path: path.join(shotDir, `00-affiliation-logos-${slug}.png`) });
  await page.getByTestId('hero-section').screenshot({
    path: path.join(shotDir, `00-hero-with-affiliations-${slug}.png`),
  });
});
