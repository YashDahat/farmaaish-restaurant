import { test, expect } from '@playwright/test';

test.describe('Admin Membership Management', () => {
  test('should allow an admin to log in and view the memberships page', async ({ page }) => {
    // Log in as admin
    await page.goto('/login');
    await page.getByTestId('email-input').fill('admin@example.com');
    await page.getByTestId('password-input').fill('adminpassword');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL('/admin/dashboard'); // Assert successful login redirect

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
    await expect(page).toHaveURL(/\/admin\/memberships\/\d+\/edit/); // Assert navigation to edit page

    // Edit membership details
    const newMembershipName = `Updated Membership ${Date.now()}`;
    await page.getByTestId('membership-name-input').fill(newMembershipName);
    await page.getByTestId('membership-price-input').fill('150.00');
    await page.getByTestId('membership-description-input').fill('An updated description for the premium membership.');
    await page.getByTestId('save-membership-button').click();

    // Assert successful update and redirect back to memberships list
    await expect(page).toHaveURL('/admin/memberships');
    await expect(page.getByTestId('memberships-table')).toBeVisible();
    await expect(page.getByTestId('membership-name-cell').filter({ hasText: newMembershipName })).toBeVisible();
  });

  test('should allow an admin to create a new membership', async ({ page }) => {
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

    // Click 'Add New Membership'
    await page.getByTestId('add-membership-button').click();
    await expect(page).toHaveURL('/admin/memberships/new');

    // Fill in new membership details
    const newMembershipName = `New Membership ${Date.now()}`;
    await page.getByTestId('membership-name-input').fill(newMembershipName);
    await page.getByTestId('membership-price-input').fill('200.00');
    await page.getByTestId('membership-description-input').fill('A brand new elite membership tier.');
    await page.getByTestId('save-membership-button').click();

    // Assert successful creation and redirect back to memberships list
    await expect(page).toHaveURL('/admin/memberships');
    await expect(page.getByTestId('memberships-table')).toBeVisible();
    await expect(page.getByTestId('membership-name-cell').filter({ hasText: newMembershipName })).toBeVisible();
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

    // Get the name of the first membership to be deleted
    const firstMembershipName = await page.getByTestId('membership-name-cell').first().textContent();

    // Click delete on the first membership
    await page.getByTestId('delete-membership-button').first().click();

    // Confirm deletion (assuming a confirmation dialog or similar)
    // For now, we'll assume a direct delete, but if a dialog appears, we'd interact with it:
    // await page.getByTestId('confirm-delete-button').click();

    // Assert successful deletion (the membership should no longer be visible)
    await expect(page.getByTestId('membership-name-cell').filter({ hasText: firstMembershipName || '' })).not.toBeVisible();
  });
});
