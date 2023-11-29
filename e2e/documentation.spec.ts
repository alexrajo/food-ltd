import { test, expect } from '@playwright/test';

/* 
  Covering navigation test on the documentation page. 
*/
test('test', async ({ page }) => {
  await page.goto('http://it2810-43.idi.ntnu.no/project2/docs');
  await expect(page.getByRole('heading')).toContainText('Welcome to the documentation page!');
  await page.getByRole('link', { name: 'Application description' }).click();
  await expect(page.locator('#root')).toContainText('Food Ltd. is a website for exploring a large number of food recipes. The user is immediately presented with over 1000 pages of recipes which can be navigated through. The number of results can be narrowed down by using search, or some of the filters.');
  await page.getByRole('link', { name: 'Prerequisites' }).click();
  await expect(page.locator('#root')).toContainText('There are several ways to run this project locally. Each option is described in their own section, in increasing order of work needed to set up.');
  await page.getByText('Prerequisites Running without').click();
  await page.getByRole('link', { name: 'Running without the backend' }).click();
  await page.getByRole('link', { name: 'Running with local database' }).click();
  await page.getByRole('link', { name: 'Other scripts' }).click();
  await page.getByRole('link', { name: 'Project Structure' }).click();
  await expect(page.getByRole('paragraph')).toContainText('The project is structured as follows:');
  await page.getByRole('link', { name: 'Mocking' }).click();
  await expect(page.locator('#root')).toContainText('For all tests except e2e tests, mock data is used. Since these tests are intended to run frequently (unlike e2e), it would be a waste of resources to use real data.');
  await page.getByRole('link', { name: 'Accessibility' }).click();
  await page.getByRole('link', { name: 'Functionality' }).click();
  await page.goto('http://it2810-43.idi.ntnu.no/project2/docs/6/0');
});