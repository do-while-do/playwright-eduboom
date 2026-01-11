import { Page, Locator, expect } from '@playwright/test';

export class OnboardingProcessPageStudent {
    readonly page: Page;
    readonly denyCookies: Locator;
    readonly acceptCookies: Locator;
    readonly roleContinueButton: Locator;
    readonly student: Locator;
    readonly classContinueButton: Locator;
    readonly sliderPrev: Locator;
    readonly sliderNext: Locator;

    constructor(page: Page) {
        this.page = page;
        this.denyCookies = page.locator('[data-title="deny-cookies"]');
        this.acceptCookies = page.locator('[data-title="accept-cookies"]');
        this.roleContinueButton = page.locator('[data-title="role-picker-continue-btn"]');
        this.student = page.locator('[data-title="student"]');
        this.classContinueButton = page.locator('[data-title="grade-picker-continue-btn"]');
        this.sliderPrev = page.locator('.slider-btn-prev');
        this.sliderNext = page.locator('.slider-btn-next');
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

    async selectRole() {
        const locator = this.student;
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

    async sliderPrevButton(times: number) {
        const btn = this.sliderPrev;
        for (let i = 0; i < times; i++) await btn.click();
    }

    selectClassLocator(grade: string): Locator {
        return this.page.locator(`.grade-card:has(.grade-card__number:text("${grade}"))`);
    }

    async checkClassIsVisible(grade: string ) {
        const classOption = this.selectClassLocator(grade);
        await expect.soft(classOption).toBeVisible();        
    }

    async selectClass(grade: string ) {
        const classOption = this.selectClassLocator(grade);
        await classOption.click();       
    }

    async continueWithSelectedClass() {
        await this.classContinueButton.click();
    }
}