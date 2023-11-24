import { test, expect } from '@playwright/test';

/* Warm up e2e test, just to test that it works 
  Tests a user navigating to the page 
    -> going to settings page 
    -> checking that dark mode button exist
*/
test('test', async ({ page }) => {
  await page.goto('http://it2810-43.idi.ntnu.no/project2/');
  await page.getByRole('link', { name: 'Settings' }).click();
  await expect(page.locator('#root')).toContainText('Darkmode');
});