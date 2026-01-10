import { Page, expect } from '@playwright/test';

export class DashboardPageStudent {
    readonly page: Page;
    readonly subjectsContainer: string[];
    readonly dashboardURL: RegExp;

    constructor(page: Page) {
        this.page = page;
        this.subjectsContainer = ['Przyroda', 'Biologia', 'Chemia'];
        this.dashboardURL = /dashboard/;
    }

    async expectUrlMatches(regex: RegExp) {
        await expect.soft(this.page).toHaveURL(regex);
    }

    async expectUrlNotMatches(regex: RegExp) {
        await expect.soft(this.page).not.toHaveURL(regex);
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