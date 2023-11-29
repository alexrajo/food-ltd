import { test, expect } from '@playwright/test';

/* 
  Tests that the UI correctly updates the navigation information when a user is navigation
  around the page.
*/
test('test', async ({ page }) => {
  await page.goto('http://it2810-43.idi.ntnu.no/project2/');
  await expect(page.locator('#root')).toContainText('< Prevousof1126Next >');
  await expect(page.locator('#root')).toContainText('< Previous12•••1126Next >');
  await page.getByRole('button', { name: 'Next >' }).nth(1).click();
  await expect(page.locator('#root')).toContainText('< Previous123•••1126Next >');
  await page.getByRole('button', { name: 'Next >' }).nth(1).click();
  await expect(page.locator('#root')).toContainText('< Previous1234•••1126Next >');
  await page.getByRole('button', { name: 'Next >' }).nth(1).click();
  await expect(page.locator('#root')).toContainText('< Previous1•••345•••1126Next >');
  await page.getByRole('button', { name: '1126' }).click();
  await expect(page.locator('#root')).toContainText('< Previous1•••11251126Next >');
  await page.getByRole('button', { name: '< Previous' }).click();
  await expect(page.locator('#root')).toContainText('< Previous1•••112411251126Next >');
  await page.getByRole('button', { name: '< Previous' }).click();
  await expect(page.locator('#root')).toContainText('< Previous1•••1123112411251126Next >');
  await page.getByRole('button', { name: '< Previous' }).click();
  await expect(page.locator('#root')).toContainText('< Previous1•••112211231124•••1126Next >');
});