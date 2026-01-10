import { Page, expect } from '@playwright/test';

export class DashboardPageTeacher {
    readonly page: Page;
    readonly dashboardURL: RegExp;
    constructor(page: Page) {
        this.page = page;
        this.dashboardURL = /dashboard/;
    }

    async expectUrlMatches(regex: RegExp) {
        await expect.soft(this.page).toHaveURL(regex);
    }

    async expectSubjectForGradeVisible(grade: string | number, subject: string) {
        const elementLocator = this.page.locator('div.subject-data', {
            hasText: `${grade} Szkoła Podstawowa`,
            has: this.page.locator('div.subject-card-title', { hasText: subject })
        });
        await expect.soft(elementLocator).toBeVisible();
    }

    async expectSubjectForGradeNotVisible(grade: string | number, subject: string) {
        const elementLocator = this.page.locator('div.subject-data', {
            hasText: `${grade} Szkoła Podstawowa`,
            has: this.page.locator('div.subject-card-title', { hasText: subject })
        });
        await expect.soft(elementLocator).not.toBeVisible();
    }
}