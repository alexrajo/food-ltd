import { test, expect } from '@playwright/test';

/* 
  Smaller test for navigation. Why is this not a component test? It requires all 
  data to be present. Test goes like this:
  Navigate to main page 
   -> Check that the navigation information is as expected
   -> Navigate to page 2
   -> Check that the navigation bar updates as expected
   -> Navigate to the last page
   - Check again
*/

test('test', async ({ page }) => {
  await page.goto('http://it2810-43.idi.ntnu.no/project2/');
  await expect(page.locator('#root')).toContainText('< Previous12•••1126Next >');
  await page.getByRole('button', { name: 'Next >' }).nth(1).click();
  await expect(page.locator('#root')).toContainText('< Previous123•••1126Next >');
  await page.getByRole('button', { name: 'Next >' }).nth(1).click();
  await expect(page.locator('#root')).toContainText('< Previous1•••234•••1126Next >');
  await page.getByRole('button', { name: '1126' }).click();
  await expect(page.locator('#root')).toContainText('< Previous1•••11251126Next >');
});