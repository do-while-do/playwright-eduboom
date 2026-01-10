import { Page, Locator, expect } from '@playwright/test';

export class OnboardingProcessPageTeacher {
    readonly page: Page;
    readonly denyCookies: Locator;
    readonly roleContinueButton: Locator;
    readonly teacher: Locator;
    readonly gradeContinueButton: Locator;
    readonly subjectContinueButton: Locator;
    readonly topBarItems: Locator;
    readonly gradePickerLocator: Locator;
    readonly onboardingTextLocator: Locator;
    readonly subjectsContainer: string[];
    readonly onboardingTextStep2: string;
    readonly onboardingTextStep3: string;
    readonly selectedSubjectToContinueOnboarding: string;

    constructor(page: Page) {
        this.page = page;
        this.denyCookies = page.locator('[data-title="deny-cookies"]');
        this.roleContinueButton = page.locator('[data-title="role-picker-continue-btn"]');
        this.teacher = page.locator('[data-title="teacher"]');
        this.gradeContinueButton = page.locator('[data-title="grade-picker-continue-btn"]');
        this.subjectContinueButton = page.locator('[data-title="subject-picker-continue-btn"]');
        this.topBarItems = page.locator('.v-list-item');
        this.gradePickerLocator = page.locator('.grade-picker-text');
        this.onboardingTextLocator = page.locator('.onboarding-text');
        this.subjectsContainer = ['Matematyka', 'Język polski', 'Chemia', 'Fizyka', 'Biologia', 'Przyroda'];
        this.onboardingTextStep2 = 'Witaj w uChase!';
        this.onboardingTextStep3 = 'Wybierz klasy';
        this.selectedSubjectToContinueOnboarding = 'Matematyka';
    }

    async goto() {
        await this.page.goto('/onboarding-process');
    }

    async denyCookiesIfVisible() {
        await expect.soft(this.denyCookies).toBeVisible();
        await this.denyCookies.click();
    }

    async expectRoleNextDisabled() {
        await expect.soft(this.roleContinueButton).toBeDisabled();
    }

    async expectTopBarCount(count: number) {
        await expect.soft(this.topBarItems).toHaveCount(count);
    }

    async selectRole(role: 'teacher') {
        const locator = this.teacher;
        await expect.soft(locator).toBeVisible();
        await locator.click();
    }

    async roleButtonToBeVisible() {
        await expect.soft(this.roleContinueButton).toBeEnabled();
        await expect.soft(this.roleContinueButton).toBeVisible();
    }

    async continueWithSelectedRole() {
        await this.roleContinueButton.click();
    }

    async expectOnboardingText(text: string, pageLocator: Locator) {
        await expect.soft(pageLocator).toHaveText(text);
    }

    async expectSubjectVisible(name: string) {
        await expect.soft(this.page.getByText(name)).toBeVisible();
    }

    async expectSubjectContinueDisabled() {
        await expect.soft(this.subjectContinueButton).toBeDisabled();
    }
    async expectSubjectContinueEnabled() {
        await expect.soft(this.subjectContinueButton).toBeEnabled();
    }

    async selectSubject(name: string) {
        await this.page.locator('.subject-list-item-title', { hasText: name }).click();
    }

    async continueWithSelectedSubject() {
        await this.subjectContinueButton.click();
    }

    async expectGradePickerButtonDisabled() { 
        await expect.soft(this.gradeContinueButton).toBeDisabled(); 
    }

    async expectGradePickerButtonEnabled() { 
        await expect.soft(this.gradeContinueButton).toBeEnabled(); 
    }

    async continueWithSelectedGrade() {
        await this.gradeContinueButton.click();
    }

    async selectMultiGrade(grade: string | number) {
        await this.page.locator('.multy-grade-bubble', { hasText: String(grade) }).click();
    }
}