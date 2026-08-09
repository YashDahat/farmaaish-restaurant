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
    await expect(page.getByText(newMembershipName)).toBeVisible(); // Assert the updated name is visible
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

    // Click create new membership
    await page.getByTestId('create-membership-button').click();
    await expect(page).toHaveURL('/admin/memberships/new');

    // Fill in new membership details
    const newMembershipName = `New Membership ${Date.now()}`;
    await page.getByTestId('membership-name-input').fill(newMembershipName);
    await page.getByTestId('membership-price-input').fill('25.00');
    await page.getByTestId('membership-description-input').fill('A brand new basic membership plan.');
    await page.getByTestId('save-membership-button').click();

    // Assert successful creation and redirect back to memberships list
    await expect(page).toHaveURL('/admin/memberships');
    await expect(page.getByTestId('memberships-table')).toBeVisible();
    await expect(page.getByText(newMembershipName)).toBeVisible(); // Assert the new name is visible
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

    // Create a new membership to delete
    await page.getByTestId('create-membership-button').click();
    await expect(page).toHaveURL('/admin/memberships/new');
    const membershipToDeleteName = `Delete Me ${Date.now()}`;
    await page.getByTestId('membership-name-input').fill(membershipToDeleteName);
    await page.getByTestId('membership-price-input').fill('10.00');
    await page.getByTestId('membership-description-input').fill('This membership is for deletion.');
    await page.getByTestId('save-membership-button').click();
    await expect(page).toHaveURL('/admin/memberships');
    await expect(page.getByText(membershipToDeleteName)).toBeVisible();

    // Find the delete button for the newly created membership and click it
    const membershipRow = page.locator(`tr:has-text("${membershipToDeleteName}")`);
    await membershipRow.getByTestId('delete-membership-button').click();

    // Confirm deletion (assuming a confirmation dialog or similar)
    // For now, we'll assume a direct delete, but if a modal appears, we'd interact with it.
    // await page.getByTestId('confirm-delete-button').click(); // Example if a modal exists

    // Assert the membership is no longer visible
    await expect(page.getByText(membershipToDeleteName)).not.toBeVisible();
  });
});
