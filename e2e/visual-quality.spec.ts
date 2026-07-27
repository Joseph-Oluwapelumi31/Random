import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const shotDir = path.join(__dirname, '..', 'verification', 'screenshots');

test.beforeAll(() => {
  fs.mkdirSync(shotDir, { recursive: true });
});

test.describe('Visual quality & regression', () => {
  test('home: hero, Ennoble strip, no blank form text', async ({ page, browserName }, testInfo) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const slug = testInfo.project.name.replace(/[^a-z0-9-]+/gi, '-');
    await page.goto('/', { waitUntil: 'load', timeout: 90_000 });
    await page.waitForSelector('[data-testid="home-page"]', { state: 'visible', timeout: 60_000 });
    await expect(page.getByTestId('home-page')).toBeVisible({ timeout: 30_000 });
    const hero = page.getByTestId('hero-section');
    await expect(hero).toBeVisible();
    await expect(hero.getByRole('heading', { level: 1 })).toContainText(/Global MedTech|Engineering/i, {
      timeout: 60_000,
    });

    if (testInfo.project.name.includes('mobile')) {
      await page.screenshot({
        path: path.join(shotDir, `01-hero-${slug}.png`),
        clip: { x: 0, y: 0, width: 390, height: 780 },
      });
    } else {
      await hero.screenshot({ path: path.join(shotDir, `01-hero-${slug}.png`) });
    }

    await page.getByTestId('featured-articles').scrollIntoViewIfNeeded();
    await expect(page.getByTestId('featured-articles')).toBeVisible();
    await page.locator('[data-testid="featured-articles"]').screenshot({
      path: path.join(shotDir, `02-ennoble-${slug}.png`),
    });

    await page.getByTestId('contact-section').scrollIntoViewIfNeeded();
    await expect(page.getByTestId('newsletter-input')).toBeVisible({ timeout: 20_000 });
    const newsletter = page.getByTestId('newsletter-input');
    await newsletter.fill(`visual-check-${browserName}@example.com`);
    const msgColor = await newsletter.evaluate((el) => window.getComputedStyle(el).color);
    const msgBg = await newsletter.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(msgColor, 'typed email should use non-white text color').not.toBe('rgb(255, 255, 255)');
    expect(msgBg, 'field should not be plain white').not.toBe('rgb(255, 255, 255)');

    const contactEmail = page.getByTestId('contact-email');
    await contactEmail.fill('contact.visual@example.org');
    const cColor = await contactEmail.evaluate((el) => window.getComputedStyle(el).color);
    expect(cColor).not.toBe('rgb(255, 255, 255)');

    await newsletter.screenshot({ path: path.join(shotDir, `03a-newsletter-${slug}.png`) });
    await page.getByTestId('contact-email').screenshot({ path: path.join(shotDir, `03b-contact-email-${slug}.png`) });
    await page.getByTestId('contact-message').screenshot({ path: path.join(shotDir, `03c-contact-message-${slug}.png`) });

    await page.screenshot({
      path: path.join(shotDir, `04-home-fullpage-${slug}.png`),
      fullPage: true,
    });
  });

  test('regulatory insights: grid loads', async ({ page }, testInfo) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const slug = testInfo.project.name.replace(/[^a-z0-9-]+/gi, '-');
    await page.goto('/regulatory-insights', { waitUntil: 'domcontentloaded', timeout: 90_000 });
    const main = page.getByTestId('regulatory-insights-page');
    try {
      await expect(main).toBeVisible({ timeout: 25_000 });
    } catch {
      await page.reload({ waitUntil: 'domcontentloaded' });
      await expect(main).toBeVisible({ timeout: 45_000 });
    }
    await page.screenshot({
      path: path.join(shotDir, `05-regulatory-insights-${slug}.png`),
      fullPage: true,
    });
  });
});
