import { test, expect } from '@playwright/test';

/* 
  User applying filters, and checking that the UI updates this correctly.
*/

test('test', async ({ page }) => {
  await page.goto('http://it2810-43.idi.ntnu.no/project2/');
  await expect(page.locator('#root')).toContainText('< Previous12•••1126Next >');
  await page.getByTestId('searchsettingsquare').click();
  await page.locator('.css-19bb58m').first().click();
  await page.locator('#react-select-2-input').fill('sugar');
  await page.locator('#react-select-2-input').press('Enter');
  await page.getByLabel('Close filter menu', { exact: true }).click();
  await expect(page.locator('#root')).toContainText('< Previous12•••400Next >');
  await page.getByTestId('searchsettingsquare').click();
  await page.locator('.css-19bb58m').first().click();
  await page.locator('#react-select-2-input').fill('salt');
  await page.locator('#react-select-2-input').press('Enter');
  await page.getByLabel('Close filter menu', { exact: true }).click();
  await expect(page.locator('#root')).toContainText('< Previous12•••295Next >');
  await page.getByRole('button', { name: 'Clear' }).click();
  await expect(page.locator('#root')).toContainText('< Previous12•••1126Next >');
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('miso');
  await page.getByPlaceholder('Search').press('Enter');
  await expect(page.locator('#root')).toContainText('< Previous12•••7Next >');
  await page.getByTestId('searchsettingsquare').click();
  await page.locator('.css-19bb58m').first().click();
  await page.locator('#react-select-2-input').fill('garlic');
  await page.locator('#react-select-2-input').press('Enter');
  await page.getByLabel('Close filter menu', { exact: true }).click();
  await expect(page.locator('#root')).toContainText('< Previous123Next >');
});