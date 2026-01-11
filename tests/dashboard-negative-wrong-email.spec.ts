import { test, expect } from '@playwright/test';
import { DashboardPageRegistrationFinish } from '../pages/DashboardPageRegistrationFinish';

test('Negative scenario - wrong email entered registration process not finished', async ({ page }) => {
    const dashboardPageRegistrationFinish = new DashboardPageRegistrationFinish(page);
    await dashboardPageRegistrationFinish.open();
    // Find the button that is in the top banner and check if it is active and click on it
    await dashboardPageRegistrationFinish.clickButtonForContinueRRegistrationIfVisible();
    // Check if the url is changed and you are on the correct page
    await dashboardPageRegistrationFinish.waitForSignupPage();
    expect(dashboardPageRegistrationFinish.page.url()).toBe(dashboardPageRegistrationFinish.url);
    // Deny cookies popup if visible
    await dashboardPageRegistrationFinish.denyCookiesIfVisible();
    // Check if top menu bars are visible and filled
    const widthStyleElementFirstStep = await dashboardPageRegistrationFinish.getStepBarWidth(0);
    expect(widthStyleElementFirstStep).toContain('width: 100%');
    // Check if the main title is visible and has correct text
    const expectedFirstStepTitleText = await dashboardPageRegistrationFinish.getTitleText();
    expect(expectedFirstStepTitleText).toBe(dashboardPageRegistrationFinish.expectedFirstStepTitleText);
    // Check if there is a field for email
    const countEmailEncounter = await dashboardPageRegistrationFinish.getEmailInputCount();
    expect(countEmailEncounter).toBe(1);
    // Check if the submit button is not active
    expect(await dashboardPageRegistrationFinish.isContinueButtonDisabled()).toBeTruthy();
    // Check if the text below the email field is visible for mandatory field
    const emailErrorText = await dashboardPageRegistrationFinish.getEmailErrorText();
    expect(emailErrorText).toBe(dashboardPageRegistrationFinish.requiredFiledMessage);
    // Fill the wrong email field with a valid email
    await dashboardPageRegistrationFinish.fillEmail('invalid-email');
    // Check for the error message about wrong email
    expect(await dashboardPageRegistrationFinish.getEmailErrorTextIfEmailIsInvalid()).toBe(dashboardPageRegistrationFinish.wrongEmailMessage);
    // Check if the submit button is still not active
    expect(await dashboardPageRegistrationFinish.isContinueButtonDisabled()).toBeTruthy();
});


