import { test, expect } from '@playwright/test';

/* 
  e2e test for ensuring UI updates correctly when filters are applied.
*/

test('test', async ({ page }) => {
  await page.goto('http://it2810-43.idi.ntnu.no/project2/');
  await page.getByTestId('searchsettingsquare').click();
  await page.locator('.css-19bb58m').first().click();
  await page.locator('#react-select-2-input').fill('salt');
  await page.locator('#react-select-2-input').press('Enter');
  await page.locator('#react-select-2-input').fill('pepper');
  await page.locator('#react-select-2-input').press('Enter');
  await page.getByLabel('Close filter menu', { exact: true }).click();
  await page.getByRole('link', { name: 'food Thanksgiving Mac and' }).click();
  await expect(page.getByRole('list')).toContainText('1 tsp. kosher salt, plus more');
  await expect(page.getByRole('list')).toContainText('½ tsp. freshly ground black pepper');
  await page.locator('#root div').filter({ hasText: 'BackThanksgiving Mac and' }).nth(3).click();
  await page.getByRole('link', { name: 'Back' }).click();
  await page.getByText('include:saltinclude:pepperClearPopularRatingA-Z< Prevousof385Next >Thanksgiving').click();
  await page.getByText('BackMiso-Butter Roast Chicken').click();
  await page.getByRole('link', { name: 'Back' }).click();
  await page.getByTestId('searchsettingsquare').click();
  await page.locator('.css-19bb58m').first().click();
  await page.locator('.css-19bb58m').first().click();
  await page.locator('.css-19bb58m').first().click();
  await page.locator('#react-select-2-input').fill('onion');
  await page.locator('#react-select-2-input').press('Enter');
  await page.locator('.css-19bb58m').first().click();
  await page.locator('#react-select-2-input').fill('egg');
  await page.locator('#react-select-2-input').press('Enter');
  await page.getByLabel('Close filter menu', { exact: true }).click();
  await page.getByRole('link', { name: 'food Spiced Lentil and' }).click();
  await expect(page.getByRole('list')).toContainText('3 large eggs');
  await page.getByRole('link', { name: 'Back' }).click();
  await page.getByTestId('searchsettingsquare').click();
  await page.locator('div:nth-child(3) > .z-999 > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
  await page.locator('.css-t3ipsp-control > .css-hlgwow > .css-19bb58m').click();
  await page.locator('#react-select-3-input').fill('flour');
  await page.locator('#react-select-3-input').press('Enter');
  await page.getByLabel('Close filter menu', { exact: true }).click();
});