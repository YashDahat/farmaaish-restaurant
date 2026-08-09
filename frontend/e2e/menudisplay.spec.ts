import { test, expect } from '@playwright/test';

test.describe('Admin Membership Management', () => {
  test('should allow an admin to log in and view the memberships page', async ({ page }) => {
    // Log in as admin
    await page.goto('/login');
    await page.getByTestId('email-input').fill('admin@example.com');
    await page.getByTestId('password-input').fill('adminpassword');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL('/admin/dashboard');

    // Navigate to memberships page
    await page.getByTestId('admin-memberships-link').click();
    await expect(page).toHaveURL('/admin/memberships');
    await expect(page.getByTestId('memberships-table')).toBeVisible();
  });

  test('should allow an admin to edit a membership', async ({ page }) => {
    // Log in as admin
    await page.goto('/login');
    await page.getByTestId('email-input').fill('admin@example.com');
    await page.getByTestId('password-input').fill('adminpassword');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL('/admin/dashboard');

    // Navigate to memberships page
    await page.getByTestId('admin-memberships-link').click();
    await expect(page).toHaveURL('/admin/memberships');
    await expect(page.getByTestId('memberships-table')).toBeVisible();

    // Click edit on the first membership
    await page.getByTestId('edit-membership-button').first().click();
    await expect(page).toHaveURL(/\/admin\/memberships\/\d+\/edit/);

    // Edit membership details
    await page.getByTestId('membership-status-select').selectOption('active');
    await page.getByTestId('membership-type-select').selectOption('premium');
    await page.getByTestId('update-membership-button').click();

    // Assert successful update and redirection
    await expect(page).toHaveURL('/admin/memberships');
    await expect(page.getByTestId('success-message')).toBeVisible();
  });

  test('should allow an admin to delete a membership', async ({ page }) => {
    // Log in as admin
    await page.goto('/login');
    await page.getByTestId('email-input').fill('admin@example.com');
    await page.getByTestId('password-input').fill('adminpassword');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL('/admin/dashboard');

    // Navigate to memberships page
    await page.getByTestId('admin-memberships-link').click();
    await expect(page).toHaveURL('/admin/memberships');
    await expect(page.getByTestId('memberships-table')).toBeVisible();

    // Get initial count of memberships
    const initialMembershipCount = await page.getByTestId('membership-row').count();

    // Click delete on the first membership
    await page.getByTestId('delete-membership-button').first().click();

    // Confirm deletion in the dialog
    await page.getByTestId('confirm-delete-button').click();

    // Assert successful deletion and updated count
    await expect(page).toHaveURL('/admin/memberships');
    await expect(page.getByTestId('success-message')).toBeVisible();
    await expect(page.getByTestId('membership-row')).toHaveCount(initialMembershipCount - 1);
  });
});
