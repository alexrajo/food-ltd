import { test, expect } from '@playwright/test';

/* 
  Making sure the UI updates correctly when a review is created
*/

test('test', async ({ page }) => {
  await page.goto('http://it2810-43.idi.ntnu.no/project2/');
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('miso');
  await page.getByPlaceholder('Search').press('Enter');
  await page.getByRole('link', { name: 'food Miso-Butter Roast' }).click();
  await page.getByRole('link', { name: 'Write a review' }).click();
  await page.getByText('Title').click();
  await page.locator('input[name="title"]').click();
  await page.locator('input[name="title"]').fill('Title for review');
  await page.getByTestId('commet-area').click();
  await page.getByTestId('commet-area').fill('Comment for review');
  await expect(page.getByTestId('commet-area')).toContainText('Comment for review');
  await page.getByRole('button', { name: 'star' }).nth(4).click();
  await page.getByRole('button', { name: 'star' }).first().click();
  await expect(page.locator('form')).toContainText('1');
  await page.getByRole('button', { name: 'star' }).nth(4).click();
  await expect(page.locator('form')).toContainText('5');
  await page.getByRole('link', { name: 'Cancel' }).click();
  await page.getByRole('link', { name: 'Back' }).click();
});