import { test, expect } from '@playwright/test';

/* 
  A comprehensive test for keyboard navigation on the page.
  Follows this pattern:
  -> Navigate around on the main page
  -> Change page by using the navigation menu
  -> Go to settings page and change settings
  -> Go back to main menu, and visit one of the dishes
*/

test('test', async ({ page }) => {
  await page.goto('http://it2810-43.idi.ntnu.no/project2/');
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').press('Tab');
  await page.getByTestId('searchsettingsquare').press('Tab');
  await page.getByRole('button', { name: 'Popular' }).press('Tab');
  await page.getByRole('button', { name: 'Rating' }).press('Enter');
  await expect(page.getByRole('button', { name: 'Rating' })).toBeVisible();
  await expect(page.locator('#root')).toContainText('< Prevousof1126Next >');
  await page.getByRole('button', { name: 'Rating' }).click();
  await page.getByRole('button', { name: 'Rating' }).press('Tab');
  await page.getByRole('button', { name: 'A-Z' }).press('Tab');
  await page.getByRole('button', { name: '< Prevous' }).press('Tab');
  await page.locator('#page').fill('10');
  await page.locator('#page').press('Enter');
  await expect(page.locator('#root')).toContainText('< Prevousof1126Next >');
  await page.locator('#page').click();
  await page.locator('#page').press('Shift+Tab');
  await page.getByRole('button', { name: '< Prevous' }).press('Enter');
  await expect(page.locator('#root')).toContainText('< Prevousof1126Next >');
  await page.locator('#page').click();
  await page.locator('#page').press('Shift+Tab');
  await page.getByRole('button', { name: '< Prevous' }).press('Shift+Tab');
  await page.getByRole('button', { name: 'A-Z' }).press('Shift+Tab');
  await page.getByRole('button', { name: 'Rating' }).press('Shift+Tab');
  await page.getByRole('button', { name: 'Popular' }).press('Enter');
  await page.getByRole('button', { name: 'Popular' }).press('Shift+Tab');
  await page.getByTestId('searchsettingsquare').press('Shift+Tab');
  await page.getByPlaceholder('Search').press('Shift+Tab');
  await page.getByRole('link', { name: 'Settings' }).press('Enter');
  await page.getByRole('link', { name: 'Settings' }).press('Tab');
  await page.getByRole('button', { name: 'Darkmode' }).press('Enter');
  await expect(page.locator('#root')).toContainText('Lightmode');
  await page.getByText('Theme').click();
  await page.locator('body').press('Tab');
  await page.getByRole('button', { name: 'Lightmode' }).press('Enter');
  await expect(page.locator('#root')).toContainText('Darkmode');
  await page.getByText('Theme').click();
  await page.locator('body').press('Tab');
  await page.getByRole('button', { name: 'Darkmode' }).press('Tab');
  await page.getByRole('button', { name: 'Fahrenheit' }).press('Enter');
  await expect(page.locator('#root')).toContainText('Celsius');
  await page.getByRole('button', { name: 'Celsius' }).click();
  await page.getByRole('button', { name: 'Fahrenheit' }).press('Tab');
  await page.getByRole('button', { name: 'Fahrenheit' }).press('Shift+Tab');
  await page.getByRole('button', { name: 'Darkmode' }).press('Shift+Tab');
  await page.getByRole('link', { name: 'Settings' }).press('Shift+Tab');
  await page.getByRole('link', { name: 'Home' }).press('Enter');
  await page.getByRole('link', { name: 'Home' }).press('Tab');
  await page.getByRole('link', { name: 'Settings' }).press('Tab');
  await page.getByPlaceholder('Search').press('Tab');
  await page.getByTestId('searchsettingsquare').press('Tab');
  await page.getByRole('button', { name: 'Popular' }).press('Tab');
  await page.getByRole('button', { name: 'Rating' }).press('Tab');
  await page.getByRole('button', { name: 'A-Z' }).press('Tab');
  await page.getByRole('button', { name: '< Prevous' }).press('Tab');
  await page.locator('#page').press('Tab');
  await page.getByRole('button', { name: 'Next >' }).first().press('Tab');
  await page.getByRole('link', { name: 'food Newton\'s Law star star' }).press('Enter');
  await expect(page.locator('#root')).toContainText('1. Stir together brown sugar and hot water in a cocktail shaker to dissolve.');
  await page.getByText('1. Stir together brown sugar').click();
  await page.locator('body').press('Tab');
  await page.getByRole('button', { name: 'Celsius' }).press('Shift+Tab');
  await page.getByRole('button', { name: 'Fahrenheit' }).press('Shift+Tab');
  await page.getByRole('link', { name: 'Write a review' }).press('Shift+Tab');
  await page.getByRole('link', { name: 'Back' }).press('Enter');
  await page.locator('body').press('Tab');
  await page.getByPlaceholder('Search').press('Tab');
  await page.getByTestId('searchsettingsquare').press('Enter');
  await page.getByTestId('searchsettingsquare').press('Tab');
  await page.locator('div:nth-child(3) > div > .fill-black > path').click();
});