import { Page, expect } from '@playwright/test';

export class DashboardPageTeacher {
    readonly page: Page;
    readonly dashboardURL: RegExp;
    readonly translatedTextToFind: string;

    constructor(page: Page) {
        this.page = page;
        this.dashboardURL = /dashboard/;
        this.translatedTextToFind = 'Szkoła Podstawowa';
    }

    async expectUrlMatches(regex: RegExp) {
        await expect.soft(this.page).toHaveURL(regex);
    }

    async expectSubjectForGradeVisible(grade: string | number, subject: string) {
        const elementLocator = this.page.locator('div.subject-data', {
            hasText: `${grade} ${this.translatedTextToFind}`,
            has: this.page.locator('div.subject-card-title', { hasText: subject })
        });
        await expect.soft(elementLocator).toBeVisible();
    }

    async expectSubjectForGradeNotVisible(grade: string | number, subject: string) {
        const elementLocator = this.page.locator('div.subject-data', {
            hasText: `${grade} ${this.translatedTextToFind}`,
            has: this.page.locator('div.subject-card-title', { hasText: subject })
        });
        await expect.soft(elementLocator).not.toBeVisible();
    }
}