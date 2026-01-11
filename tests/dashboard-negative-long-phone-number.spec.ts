import { test, expect } from '@playwright/test';
import { DashboardPageRegistrationFinish } from '../pages/DashboardPageRegistrationFinish';

test('Negative scenario - long phone number entered registration process not finished', async ({ page }) => {
    const dashboardPageRegistrationFinish = new DashboardPageRegistrationFinish(page);
    // Navigate to dashboard
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
    // Fill the email field with a valid email
    const email = dashboardPageRegistrationFinish.generateRandomEmail();
    await dashboardPageRegistrationFinish.fillEmail(email);
    // Check if the submit button is active now
    expect(await dashboardPageRegistrationFinish.isContinueButtonEnabled()).toBeTruthy();
    // Click the submit button
    await dashboardPageRegistrationFinish.clickContinue();
    // On the next step the top bar should be filled showing that we are on step two
    await expect.poll(async () => {
        return await dashboardPageRegistrationFinish.getStepBarWidth(1);
    }).toContain('width: 100%');
    // Check if submit button is not active
    expect(await dashboardPageRegistrationFinish.isContinueButtonDisabled()).toBeTruthy();
    // Check if there is a new field for the name of the user
    expect(await dashboardPageRegistrationFinish.isNameInputVisible()).toBeTruthy();
    // Fill the name field
    await dashboardPageRegistrationFinish.fillName('John Doe');
    const value = await dashboardPageRegistrationFinish.nameInput.inputValue();
    expect(value).toBe('John Doe');
    // Check if the submit button is active now
    expect(await dashboardPageRegistrationFinish.isContinueButtonEnabled()).toBeTruthy();
    // Click the submit button
    await dashboardPageRegistrationFinish.clickContinue();
    // On the next step the top bar should be filled showing that we are on step three
    const widthStyleElementThirdStep = await dashboardPageRegistrationFinish.getStepBarWidth(2);
    expect(widthStyleElementThirdStep).toContain('width: 100%');
    // Check if a new field is shown with the telephone number
    expect(await dashboardPageRegistrationFinish.isPhoneInputVisible()).toBeTruthy();
    // Check if the submit button is not active
    expect(await dashboardPageRegistrationFinish.isContinueButtonDisabled()).toBeTruthy();
    // Fill the telephone number field with a long phone number
    await dashboardPageRegistrationFinish.fillPhone('433453453453453453453'); // wrong phone number
    // Check for the error message about long phone number
    expect(await dashboardPageRegistrationFinish.getPhoneErrorText()).toBe(dashboardPageRegistrationFinish.wrongPhoneMessage);
    // Check if the submit button is still not active
    expect(await dashboardPageRegistrationFinish.isContinueButtonDisabled()).toBeTruthy();
});
