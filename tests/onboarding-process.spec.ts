import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/onboarding-process');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Lekcje wideo online dla szkół ze wszystkich przedmiotów/);
});

test('get started link', async ({ page }) => {
  await page.goto('/onboarding-process');

  // Expects page to have a heading with the certain text 
  await expect(page.getByText('Poznajmy się!')).toBeVisible();
});


