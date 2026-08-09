import { test, expect } from '@playwright/test';

test.describe('Admin Membership Management', () => {
  test('should allow an admin to log in and view the memberships page', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('email-input').fill('admin@example.com');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL('/admin/dashboard');

    await page.getByTestId('memberships-nav-link').click();
    await expect(page).toHaveURL('/admin/memberships');
    await expect(page.getByTestId('memberships-table')).toBeVisible();
  });

  test('should allow an admin to create a new membership', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('email-input').fill('admin@example.com');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL('/admin/dashboard');

    await page.getByTestId('memberships-nav-link').click();
    await expect(page).toHaveURL('/admin/memberships');

    await page.getByTestId('create-membership-button').click();
    await expect(page).toHaveURL('/admin/memberships/new');

    await page.getByTestId('membership-name-input').fill('Premium Monthly');
    await page.getByTestId('membership-price-input').fill('29.99');
    await page.getByTestId('membership-duration-input').fill('30');
    await page.getByTestId('membership-duration-unit-select').selectOption('days');
    await page.getByTestId('membership-description-input').fill('Full access to all features.');
    await page.getByTestId('save-membership-button').click();

    await expect(page).toHaveURL('/admin/memberships');
    await expect(page.getByTestId('memberships-table')).toBeVisible();
    await expect(page.getByTestId('membership-row-Premium Monthly')).toBeVisible();
  });

  test('should allow an admin to edit an existing membership', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('email-input').fill('admin@example.com');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL('/admin/dashboard');

    await page.getByTestId('memberships-nav-link').click();
    await expect(page).toHaveURL('/admin/memberships');

    // Assuming a membership named 'Basic Monthly' exists from seeding or prior test
    await page.getByTestId('edit-membership-button-Basic Monthly').click();
    await expect(page).toHaveURL(/\/admin\/memberships\/\d+\/edit/);

    await page.getByTestId('membership-name-input').fill('Basic Monthly Updated');
    await page.getByTestId('membership-price-input').fill('15.00');
    await page.getByTestId('save-membership-button').click();

    await expect(page).toHaveURL('/admin/memberships');
    await expect(page.getByTestId('memberships-table')).toBeVisible();
    await expect(page.getByTestId('membership-row-Basic Monthly Updated')).toBeVisible();
  });

  test('should allow an admin to delete an existing membership', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('email-input').fill('admin@example.com');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL('/admin/dashboard');

    await page.getByTestId('memberships-nav-link').click();
    await expect(page).toHaveURL('/admin/memberships');

    // Assuming a membership named 'Free Tier' exists from seeding or prior test
    await page.getByTestId('delete-membership-button-Free Tier').click();
    await page.getByTestId('confirm-delete-button').click();

    await expect(page).toHaveURL('/admin/memberships');
    await expect(page.getByTestId('memberships-table')).toBeVisible();
    await expect(page.getByTestId('membership-row-Free Tier')).not.toBeVisible();
  });
});
