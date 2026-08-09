import { test, expect } from '@playwright/test';

test.describe('Admin Membership Management', () => {
  test('should allow an admin to log in and view the memberships page', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('email-input').fill('admin@example.com');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL('/admin/dashboard');

    await page.getByTestId('admin-memberships-link').click();
    await expect(page).toHaveURL('/admin/memberships');
    await expect(page.getByTestId('memberships-table')).toBeVisible();
  });

  test('should allow an admin to edit a membership', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('email-input').fill('admin@example.com');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL('/admin/dashboard');

    await page.getByTestId('admin-memberships-link').click();
    await expect(page).toHaveURL('/admin/memberships');
    await expect(page.getByTestId('memberships-table')).toBeVisible();

    // Assuming there's at least one membership to edit. Click the first edit button.
    await page.getByTestId('edit-membership-button').first().click();
    await expect(page).toHaveURL(/\/admin\/memberships\/\d+\/edit/);

    // Edit a field, e.g., the status
    await page.getByTestId('membership-status-select').selectOption('active');
    await page.getByTestId('save-membership-button').click();

    await expect(page).toHaveURL('/admin/memberships');
    await expect(page.getByTestId('success-message')).toBeVisible();
  });

  test('should allow an admin to delete a membership', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('email-input').fill('admin@example.com');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL('/admin/dashboard');

    await page.getByTestId('admin-memberships-link').click();
    await expect(page).toHaveURL('/admin/memberships');
    await expect(page.getByTestId('memberships-table')).toBeVisible();

    // Assuming there's at least one membership to delete. Click the first delete button.
    await page.getByTestId('delete-membership-button').first().click();
    await page.getByTestId('confirm-delete-button').click();

    await expect(page).toHaveURL('/admin/memberships');
    await expect(page.getByTestId('success-message')).toBeVisible();
  });
});
