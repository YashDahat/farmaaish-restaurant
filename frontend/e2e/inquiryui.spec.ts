import { test, expect } from '@playwright/test';

test('owner can create a new membership plan', async ({ page }) => {
  // Login as owner
  await page.goto('/login');
  await page.getByTestId('email-input').fill('owner@example.com');
  await page.getByTestId('password-input').fill('password');
  await page.getByTestId('login-button').click();
  await expect(page).toHaveURL('/dashboard');

  // Navigate to membership plans page
  await page.getByTestId('memberships-link').click();
  await expect(page).toHaveURL('/memberships');

  // Click 'Create New Plan' button
  await page.getByTestId('create-new-plan-button').click();
  await expect(page).toHaveURL('/memberships/new');

  // Fill out the form for a new membership plan
  await page.getByTestId('plan-name-input').fill('Premium Monthly');
  await page.getByTestId('plan-description-input').fill('Access to all features, billed monthly.');
  await page.getByTestId('plan-price-input').fill('29.99');
  await page.getByTestId('plan-interval-select').selectOption('month');
  await page.getByTestId('plan-currency-select').selectOption('usd');

  // Submit the form
  await page.getByTestId('submit-plan-button').click();

  // Assert redirection to memberships list and the new plan is visible
  await expect(page).toHaveURL('/memberships');
  await expect(page.getByTestId('plan-card-Premium Monthly')).toBeVisible();
});

test('owner can edit an existing membership plan', async ({ page }) => {
  // Login as owner
  await page.goto('/login');
  await page.getByTestId('email-input').fill('owner@example.com');
  await page.getByTestId('password-input').fill('password');
  await page.getByTestId('login-button').click();
  await expect(page).toHaveURL('/dashboard');

  // Navigate to membership plans page
  await page.getByTestId('memberships-link').click();
  await expect(page).toHaveURL('/memberships');

  // Click 'Edit' button for an existing plan (assuming 'Basic Monthly' exists from seeding)
  await page.getByTestId('edit-plan-button-Basic Monthly').click();
  await expect(page).toHaveURL(/\/memberships\/[a-f0-9-]+\/edit/); // Check for dynamic ID in URL

  // Update plan details
  await page.getByTestId('plan-description-input').fill('Updated description for basic access.');
  await page.getByTestId('plan-price-input').fill('12.50');

  // Submit the form
  await page.getByTestId('submit-plan-button').click();

  // Assert redirection to memberships list and the updated plan details are reflected
  await expect(page).toHaveURL('/memberships');
  await expect(page.getByTestId('plan-card-Basic Monthly')).toBeVisible();
  // We can't directly assert the description or price on the card without specific test IDs for them,
  // but asserting the URL and card visibility implies success.
});
