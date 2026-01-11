import { test, expect } from '@playwright/test';
import { DashboardPageRegistrationFinish } from '../pages/DashboardPageRegistrationFinish';

test('Positive scenario - Student or Teacher Registration process finish', async ({ page }) => {
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
    // Fill the telephone number field
    await dashboardPageRegistrationFinish.fillPhone('123456789');
    const PhoneNumberValue = await dashboardPageRegistrationFinish.getPhoneValue();
    expect(PhoneNumberValue).toBe('123456789');
    // Check if the submit button is active now
    expect(await dashboardPageRegistrationFinish.isContinueButtonEnabled()).toBeTruthy();
    // Click the submit button
    await dashboardPageRegistrationFinish.clickContinue();
    // On the next step the top bar should be filled showing that we are on step four
    const widthStyleElementFourthStep = await dashboardPageRegistrationFinish.getStepBarWidth(3);
    expect(widthStyleElementFourthStep).toContain('width: 100%');
    // Check if the field for passwords is visible
    expect(await dashboardPageRegistrationFinish.isPasswordInputVisible()).toBeTruthy();
    // Check if the submit button is not active
    expect(await dashboardPageRegistrationFinish.isContinueButtonOnPasswordStepDisabled()).toBeTruthy();
    // Fill the password field with a valid password
    await dashboardPageRegistrationFinish.fillPassword('StrongPass123!@');
    const PasswordValue = await dashboardPageRegistrationFinish.getPasswordValue();
    expect(PasswordValue).toBe('StrongPass123!@');
    // Check if the submit button is active now
    expect(await dashboardPageRegistrationFinish.isContinueButtonOnPasswordStepEnabled()).toBeTruthy();
    // Click the submit button
    await dashboardPageRegistrationFinish.clickContinueOnPasswordStep();
    // Check if you have the correct thank you message on the final page
    await expect(dashboardPageRegistrationFinish.welcomeMessage).toBeVisible();
    expect(await dashboardPageRegistrationFinish.isWelcomeMessageVisible()).toBeTruthy();
    const welcomeMessageText = await dashboardPageRegistrationFinish.getWelcomeMessageText();
    expect(welcomeMessageText).toContain(dashboardPageRegistrationFinish.expectedWelcomeStart);
    expect(welcomeMessageText).toContain(dashboardPageRegistrationFinish.expectedWelcomeEnd);
    // Check if there is next button and click on it  
    expect(await dashboardPageRegistrationFinish.isContinueToDashboardEnabled()).toBeTruthy();
    // Click the button to go to dashboard
    await dashboardPageRegistrationFinish.clickContinueToDashboard();
    // Verify that you are on the dashboard page
    await dashboardPageRegistrationFinish.waitForDashboardPage();
    expect(await dashboardPageRegistrationFinish.isOnDashboardPage()).toBeTruthy();
});