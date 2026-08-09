import { test, expect } from '@playwright/test';

test.describe('Admin Membership Management', () => {
  test('should allow an admin to log in and view the memberships page', async ({ page }) => {
    // Log in as admin
    await page.goto('/login');
    await page.getByTestId('email-input').fill('admin@example.com');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL('/admin/dashboard');

    // Navigate to memberships page
    await page.getByTestId('admin-memberships-link').click();
    await expect(page).toHaveURL('/admin/memberships');
    await expect(page.getByTestId('memberships-title')).toBeVisible();
    await expect(page.getByTestId('membership-list')).toBeVisible();
  });

  test('should allow an admin to create a new membership', async ({ page }) => {
    // Log in as admin
    await page.goto('/login');
    await page.getByTestId('email-input').fill('admin@example.com');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL('/admin/dashboard');

    // Navigate to memberships page
    await page.getByTestId('admin-memberships-link').click();
    await expect(page).toHaveURL('/admin/memberships');

    // Click create new membership button
    await page.getByTestId('create-membership-button').click();
    await expect(page).toHaveURL('/admin/memberships/new');
    await expect(page.getByTestId('new-membership-form')).toBeVisible();

    // Fill out the form
    await page.getByTestId('membership-name-input').fill('Premium Monthly');
    await page.getByTestId('membership-price-input').fill('29.99');
    await page.getByTestId('membership-duration-input').fill('30');
    await page.getByTestId('membership-description-input').fill('Access to all premium features for a month.');
    await page.getByTestId('membership-active-checkbox').check();

    // Submit the form
    await page.getByTestId('submit-membership-button').click();

    // Assert redirection and new membership visibility
    await expect(page).toHaveURL('/admin/memberships');
    await expect(page.getByTestId('membership-list')).toBeVisible();
    await expect(page.getByTestId('membership-item-Premium Monthly')).toBeVisible();
  });

  test('should allow an admin to edit an existing membership', async ({ page }) => {
    // Log in as admin
    await page.goto('/login');
    await page.getByTestId('email-input').fill('admin@example.com');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL('/admin/dashboard');

    // Navigate to memberships page
    await page.getByTestId('admin-memberships-link').click();
    await expect(page).toHaveURL('/admin/memberships');

    // Click edit button for an existing membership (assuming 'Basic Monthly' exists from seed)
    await page.getByTestId('edit-membership-button-Basic Monthly').click();
    await expect(page).toHaveURL(/\/admin\/memberships\/\d+\/edit/); // Check for dynamic ID in URL
    await expect(page.getByTestId('edit-membership-form')).toBeVisible();

    // Edit the form fields
    await page.getByTestId('membership-price-input').fill('12.99');
    await page.getByTestId('membership-description-input').fill('Updated description for basic access.');

    // Submit the form
    await page.getByTestId('submit-membership-button').click();

    // Assert redirection and updated membership visibility
    await expect(page).toHaveURL('/admin/memberships');
    await expect(page.getByTestId('membership-list')).toBeVisible();
    await expect(page.getByTestId('membership-item-Basic Monthly')).toBeVisible();
    // Optionally, assert the updated price is visible in the list if the UI shows it
    // await expect(page.getByTestId('membership-price-Basic Monthly')).toHaveText('$12.99');
  });

  test('should allow an admin to delete an existing membership', async ({ page }) => {
    // Log in as admin
    await page.goto('/login');
    await page.getByTestId('email-input').fill('admin@example.com');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL('/admin/dashboard');

    // Navigate to memberships page
    await page.getByTestId('admin-memberships-link').click();
    await expect(page).toHaveURL('/admin/memberships');

    // Create a temporary membership to delete
    await page.getByTestId('create-membership-button').click();
    await page.getByTestId('membership-name-input').fill('Temporary Membership');
    await page.getByTestId('membership-price-input').fill('1.00');
    await page.getByTestId('membership-duration-input').fill('1');
    await page.getByTestId('submit-membership-button').click();
    await expect(page).toHaveURL('/admin/memberships');
    await expect(page.getByTestId('membership-item-Temporary Membership')).toBeVisible();

    // Click delete button for the temporary membership
    await page.getByTestId('delete-membership-button-Temporary Membership').click();

    // Confirm deletion (assuming a confirmation dialog appears)
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Are you sure you want to delete this membership?');
      await dialog.accept();
    });

    // Assert the membership is no longer visible
    await expect(page.getByTestId('membership-item-Temporary Membership')).not.toBeVisible();
  });
});
