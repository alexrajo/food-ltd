import { test, expect } from '@playwright/test';

/* 
  Longer e2e test that checks for ingredients
  Test steps:
  -> Go to main page
  -> Search for newton (a dish that exist)
  -> Check that it shows up
  -> Cancel search
  -> Search for newtonss (a dish that does not exist)
  -> Check that no dishes show up
  -> Apply filter : sugar
  -> Check that the filter shows up under search bar, and that search result is reduced
  -> Go into a dish with sugar, and check that sugar actually is an ingrediant.
*/

test('test', async ({ page }) => {
  await page.goto('http://it2810-43.idi.ntnu.no/project2/');
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('newton');
  await page.getByPlaceholder('Search').press('Enter');
  await expect(page.locator('#root')).toContainText('Newton\'s Law');
  await expect(page.locator('#root')).toContainText('< Previous1Next >');
  await page.locator('.relative > .flex > .fill-black > path').click();
  await expect(page.locator('#root')).toContainText('< Previous12•••1126Next >');
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('newtonss');
  await page.getByPlaceholder('Search').press('Enter');
  await expect(page.locator('#root')).toContainText('No dishes found');
  await expect(page.locator('#root')).toContainText('Showing results for: "newtonss"');
  await page.getByRole('img').nth(3).click();
  await expect(page.locator('#root')).toContainText('< Previous12•••1126Next >');
  await page.getByTestId('searchsettingsquare').click();
  await page.locator('.css-19bb58m').first().click();
  await page.locator('#react-select-2-input').fill('sugar');
  await page.locator('#react-select-2-input').press('Enter');
  await expect(page.locator('#root')).toContainText('include:sugarClear');
  await page.locator('div:nth-child(3) > div > .fill-black > path').click();
  await expect(page.locator('#root')).toContainText('< Previous12•••400Next >');
  await page.getByRole('link', { name: 'food Newton\'s Law star star' }).click();
  await page.locator('body').press('Control+f');
  await page.locator('body').press('Control+f');
  await page.locator('body').press('Control+f');
  await page.getByRole('link', { name: 'Back' }).click();
  await page.getByRole('link', { name: 'food Newton\'s Law star star' }).click();
  await page.getByText('teaspoon dark brown sugar').click();
  await expect(page.getByRole('list')).toContainText('sugar');
  await page.getByRole('link', { name: 'Back' }).click();
});