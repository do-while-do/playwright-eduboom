import { Page, expect, Locator } from '@playwright/test';

export class DashboardPageRegistrationFinish {
    readonly page: Page;
    readonly card: Locator;
    readonly denyCookies: Locator;
    readonly resetPassButton: Locator;
    readonly stepperContainer: Locator;
    readonly steps: Locator;
    readonly firstStepTitle: Locator;
    readonly emailInput: Locator;
    readonly continueButton: Locator;
    readonly continueButtonOnPasswordStep: Locator;
    readonly errorMessageDiv: Locator;
    readonly nameInput: Locator;
    readonly phoneInput: Locator;
    readonly passwordInput: Locator;
    readonly welcomeMessage: Locator;
    readonly continueToDashboard: Locator;
    readonly enterActiveErrorMessageDiv: Locator;
    readonly url: string;
    readonly dashboardUrl: string;
    readonly expectedFirstStepTitleText: string;
    readonly requiredFiledMessage: string;
    readonly wrongEmailMessage: string;
    readonly wrongPhoneMessage: string;
    readonly expectedWelcomeStart: string;
    readonly expectedWelcomeEnd: string;

    constructor(page: Page) {
        const baseURL = process.env.BASE_URL?.replace(/\/$/, ''); 

        this.page = page;
        this.card = page.locator('div.incomplete-card');
        this.denyCookies = page.locator('[data-title="deny-cookies"]');
        this.resetPassButton = this.card.locator('button[data-title="reset-pass-button"]');
        this.stepperContainer = page.locator('.stepper-list');
        this.steps = this.stepperContainer.locator('.v-list-item');
        this.firstStepTitle = page.locator('.signup-title');
        this.url = `${baseURL}/auth/signup`;
        this.dashboardUrl = `${baseURL}/dashboard`;
        this.expectedFirstStepTitleText = 'Jaki jest Twój adres e-mail?';
        this.emailInput = page.locator('input[id^="input-v-0-"][type="email"]'); // email
        this.nameInput = page.locator('input[id^="input-v-0-"][type="text"]'); // name
        this.phoneInput = page.locator('[data-title="signup-phone"] input.v-field__input'); // phone
        this.passwordInput = page.locator('input[id^="input-v-0-"][type="password"]'); // password
        this.continueButton = page.locator('button[data-title="continue-button"]');
        this.continueButtonOnPasswordStep = page.locator('button[data-title="role-picker-continue-btn"]');
        this.errorMessageDiv = page.locator('.v-messages__message');
        this.enterActiveErrorMessageDiv = page.locator('.v-messages__message.slide-y-transition-enter-active');
        this.requiredFiledMessage = 'To pole jest wymagane.';
        this.wrongEmailMessage = 'Adres e-mail jest nieprawidłowy.';
        this.wrongPhoneMessage = 'Numer telefonu musi mieć od 6 do 16 znaków.';
        this.welcomeMessage = page.locator('.welcome-msg-text');
        this.continueToDashboard = page.locator('button[data-title="continue-to-dashboard"]');
        this.expectedWelcomeStart = 'Witaj!';
        this.expectedWelcomeEnd = 'Twój profil został pomyślnie utworzony.';
    }

    generateRandomEmail(): string {
        const random = Math.random().toString(36).substring(2, 10);
        return `test_${random}@example.com`;
    }


    async open() {
        await this.page.goto(this.dashboardUrl);
    }

    async denyCookiesIfVisible() {
        if (await this.denyCookies.isVisible()) {
            await this.denyCookies.click();
            return true;
        }
        return false;
    }

    async clickButtonForContinueRRegistrationIfVisible() {
        await this.resetPassButton.click();
    }

    async waitForSignupPage() {
        await this.page.waitForURL(this.url);
    }

    async getStepCount() {
        return this.steps.count();
    }

    async getStepBar(index: number) {
        return this.steps.nth(index).locator('.v-progress-linear__determinate.bg-vcyan');
    }

    async getStepBarWidth(index: number) {
        const bar = this.steps.nth(index).locator('.v-progress-linear__determinate.bg-vcyan');
        return bar.getAttribute('style');
    }

    async getTitleText() {
        return this.firstStepTitle.innerText();
    }

    async emailInputExists() {
        return this.emailInput.count().then(c => c === 1);
    }

    async getEmailInputCount() {
        return this.emailInput.count();
    }

    async isContinueButtonDisabled() {
        return this.continueButton.isDisabled();
    }

    async isContinueButtonEnabled() {
        return this.continueButton.isEnabled();
    }

    async isContinueButtonOnPasswordStepDisabled() {
        return this.continueButtonOnPasswordStep.isDisabled();
    }

    async isContinueButtonOnPasswordStepEnabled() {
        return this.continueButtonOnPasswordStep.isEnabled();
    }

    async clickContinueOnPasswordStep() {
        await this.continueButtonOnPasswordStep.click();
    }

    async getEmailErrorText() {
        return this.errorMessageDiv.innerText();
    }

    async getEmailErrorTextIfEmailIsInvalid() {
        return this.enterActiveErrorMessageDiv.innerText();
    }

    async getPhoneErrorText() {
        return this.errorMessageDiv.innerText();
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async fillName(name: string) {
        await this.nameInput.fill(name);
    }

    async isNameInputVisible() {
        return this.nameInput.isVisible();
    }

    async fillPhone(phone: string) {
        await this.phoneInput.fill(phone);
    }

    async isPhoneInputVisible() {
        return this.phoneInput.isVisible();
    }

    async getPhoneValue() {
        return this.phoneInput.inputValue();
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async isPasswordInputVisible(): Promise<boolean> {
        return this.passwordInput.isVisible();
    }

    async getPasswordValue(): Promise<string> {
        return this.passwordInput.inputValue();
    }

    async isWelcomeMessageVisible() {
        return this.welcomeMessage.isVisible();
    }

    async getWelcomeMessageText() {
        return this.welcomeMessage.innerText();
    }

    async isContinueToDashboardEnabled() {
        return this.continueToDashboard.isEnabled();
    }

    async clickContinueToDashboard() {
        await this.continueToDashboard.click();
    }

    async waitForDashboardPage() {
        await this.page.waitForURL(this.dashboardUrl);
    }

    async isOnDashboardPage() {
        return this.page.url() === this.dashboardUrl;
    }
}
