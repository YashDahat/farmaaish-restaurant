import { test, expect } from '@playwright/test';

test.describe('Owner Onboarding', () => {
  test('should allow an owner to complete onboarding after login', async ({ page }) => {
    // Login as owner
    await page.goto('/login');
    await page.getByTestId('email-input').fill('owner@example.com');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL('/onboarding');

    // Step 1: Welcome
    await expect(page.getByTestId('onboarding-welcome-title')).toBeVisible();
    await page.getByTestId('onboarding-next-button').click();

    // Step 2: Business Info
    await expect(page.getByTestId('business-name-input')).toBeVisible();
    await page.getByTestId('business-name-input').fill('My Awesome Business');
    await page.getByTestId('business-address-input').fill('123 Main St');
    await page.getByTestId('business-city-input').fill('Anytown');
    await page.getByTestId('business-state-input').fill('CA');
    await page.getByTestId('business-zip-input').fill('90210');
    await page.getByTestId('onboarding-next-button').click();

    // Step 3: Services Offered
    await expect(page.getByTestId('service-name-input')).toBeVisible();
    await page.getByTestId('service-name-input').fill('Haircut');
    await page.getByTestId('service-duration-input').fill('30');
    await page.getByTestId('service-price-input').fill('50');
    await page.getByTestId('add-service-button').click();
    await expect(page.getByTestId('service-item-Haircut')).toBeVisible();

    await page.getByTestId('service-name-input').fill('Coloring');
    await page.getByTestId('service-duration-input').fill('90');
    await page.getByTestId('service-price-input').fill('150');
    await page.getByTestId('add-service-button').click();
    await expect(page.getByTestId('service-item-Coloring')).toBeVisible();
    await page.getByTestId('onboarding-next-button').click();

    // Step 4: Staff Members
    await expect(page.getByTestId('staff-name-input')).toBeVisible();
    await page.getByTestId('staff-name-input').fill('Jane Doe');
    await page.getByTestId('staff-email-input').fill('jane@example.com');
    await page.getByTestId('add-staff-button').click();
    await expect(page.getByTestId('staff-item-Jane Doe')).toBeVisible();

    await page.getByTestId('staff-name-input').fill('John Smith');
    await page.getByTestId('staff-email-input').fill('john@example.com');
    await page.getByTestId('add-staff-button').click();
    await expect(page.getByTestId('staff-item-John Smith')).toBeVisible();
    await page.getByTestId('onboarding-next-button').click();

    // Step 5: Confirmation
    await expect(page.getByTestId('onboarding-confirmation-title')).toBeVisible();
    await page.getByTestId('onboarding-finish-button').click();

    // Assert redirection to dashboard or home page after onboarding
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByTestId('dashboard-welcome-message')).toBeVisible();
  });
});
