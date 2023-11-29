import { test, expect } from '@playwright/test';

/* 
  Tries to simulate a user with strange behaviour.
  Includes putting illegal inputs to the goto page input:
  - values too big
  - negative values
  - alphabetic values
*/

test('test', async ({ page }) => {
  await page.goto('http://it2810-43.idi.ntnu.no/project2/');
  await page.getByLabel('Go to page number').click();
  await page.getByLabel('Go to page number').fill('1300');
  await page.getByLabel('Go to page number').press('Enter');
  await expect(page.locator('#root')).toContainText('No dishes found');
  await expect(page.locator('#root')).toContainText('< Previous1•••12991300Next >');
  await page.getByLabel('Go to page number').click();
  await page.getByLabel('Go to page number').click();
  await page.getByLabel('Go to page number').click();
  await page.getByLabel('Go to page number').press('ArrowRight');
  await page.getByLabel('Go to page number').press('ArrowRight');
  await page.getByLabel('Go to page number').fill('1127');
  await page.getByLabel('Go to page number').press('Enter');
  await page.getByRole('button', { name: '< Previous' }).click();
  await page.getByRole('button', { name: 'Next >' }).nth(1).click();
  await page.getByRole('button', { name: 'Next >' }).nth(1).click();
  await page.getByRole('button', { name: '< Previous' }).click();
  await page.getByLabel('Go to page number').click();
  await page.getByLabel('Go to page number').press('ArrowRight');
  await page.getByLabel('Go to page number').press('ArrowRight');
  await page.getByLabel('Go to page number').fill('');
  await page.getByLabel('Go to page number').click();
  await page.getByLabel('Go to page number').click();
  await page.getByLabel('Go to page number').fill('04');
  await page.getByLabel('Go to page number').press('ArrowLeft');
  await page.getByLabel('Go to page number').fill('-4');
  await page.getByLabel('Go to page number').press('Enter');
  await expect(page.locator('#root')).toContainText('< Previous-4-3•••1126Next >');
  await page.getByLabel('Go to page number').click();
  await page.getByLabel('Go to page number').press('ArrowRight');
  await page.getByLabel('Go to page number').fill('Na');
  await page.getByLabel('Go to page number').press('Enter');
  await expect(page.locator('#root')).toContainText('< PreviousNaNNext >');
  await expect(page.locator('#root')).toContainText('No dishes found');
  await page.getByTestId('searchsettingsquare').click();
  await page.getByLabel('Close filter menu', { exact: true }).click();
});