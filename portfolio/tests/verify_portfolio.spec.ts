import { test, expect } from '@playwright/test';

test('verify portfolio content', async ({ page }) => {
  // Wait for the page to load
  await page.goto('http://localhost:3000');

  // Verify Hero Section
  // Using more specific locators
  await expect(page.getByRole('heading', { name: 'Ismail Hossain.' })).toBeVisible();
  await expect(page.getByText('Flutter & Kotlin Developer')).toBeVisible();

  // Verify Navbar Links
  await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Experience' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Achievements' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Education' })).toBeVisible();

  // Verify Education Section
  await expect(page.getByRole('heading', { name: 'Education', exact: true })).toBeVisible();
  await expect(page.getByText('Diploma In Engineering on CST')).toBeVisible();
  await expect(page.getByText('Tangail Polytechnic Inistitute.')).toBeVisible();

  // Verify Admin Page
  await page.goto('http://localhost:3000/admin');
  await expect(page.getByRole('heading', { name: 'Portfolio Admin' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Copy Updated JSON' })).toBeVisible();

  // Verify Education in Admin
  await expect(page.getByRole('heading', { name: 'Education', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add Education' })).toBeVisible();
});
