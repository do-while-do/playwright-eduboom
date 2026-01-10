import { test, expect } from '@playwright/test';
import { OnboardingProcessPageStudent } from '../pages/OnboardingProcessPageStudent';
import { DashboardPageStudent } from '../pages/DashboardPageStudent';

test.describe('Onboarding process', () => {
    test.only('Positive scenario - User role selected', async ({ page }) => {

        const onboarding = new OnboardingProcessPageStudent(page);
        const dashboard = new DashboardPageStudent(page);

        await onboarding.goto();
        // Deny cookies popup to be visible
        await onboarding.denyCookiesIfVisible();
        // Select next button locator and Assert Next button should be disabled on page load
        await onboarding.expectRoleNextDisabled();
        // Pick a student role
        await onboarding.selectRole();
        // Assert student role picker button is visible 
        await onboarding.roleButtonToBeVisible();
        // Click on the Role picking button (Next step after role selection)
        await onboarding.continueWithSelectedRole();
        // Selecting a class. Picking lessons for class 4, navigating with left and right navigation buttons 
        await onboarding.sliderPrevButton(3);
        // Asserting class 4 is visible after navigating to it
        await onboarding.checkClassIsVisible("4");
        // Selecting class 4
        await onboarding.selectClass("4");
        // Navigating to next step after sussesfully picking a class 
        await onboarding.continueWithSelectedClass();
        // Checking if we have been redirected to the next page
        await dashboard.expectUrlMatches(dashboard.dashboardURL);
        // Checking if only lessons for class 4 are visible
        await dashboard.expectSubjectForGradeVisible(4, dashboard.subjectsContainer[0]); // Przyroda
        // Additional check: there are no lessons from other classes    
        await dashboard.expectSubjectForGradeNotVisible(7, dashboard.subjectsContainer[1]); // Biologia
        // Additional check: there are no lessons from other classes
        await dashboard.expectSubjectForGradeNotVisible(7, dashboard.subjectsContainer[2]); // Chemia
    });

    test('Negative scenario - User role selected', async ({ page }) => {
        const jsErrors: string[] = [];
        const failedRequests: string[] = [];

        const onboarding = new OnboardingProcessPageStudent(page);
        const dashboard = new DashboardPageStudent(page);

        await onboarding.goto();
        // Deny cookies popup to be visible
        await onboarding.denyCookiesIfVisible();
        // Select next button locator and Assert Next button should be disabled on page load
        await onboarding.expectRoleNextDisabled();
        // Pick a student role
        await onboarding.selectRole();
        // Assert student role picker button is visible
        await onboarding.roleButtonToBeVisible();
        // Click on the Role picking button (Next step after role selection)
        await onboarding.continueWithSelectedRole();
        // Selecting a class. Picking lessons for class 4, navigating with left and right navigation buttons 
        await onboarding.sliderPrevButton(3);
        // Asserting class 4 is visible after navigating to it
        await onboarding.checkClassIsVisible("4");
        // Selecting class 4
        await onboarding.selectClass("4");

        page.on('pageerror', err => jsErrors.push(err.message));
        page.on('requestfailed', req => failedRequests.push(req.url()));

        // Navigating to next step after sussesfully picking a class 
        await onboarding.continueWithSelectedClass();

        const hasErrors = jsErrors.length > 0 || failedRequests.length > 0;
        const errors = test.info().errors;
        if (hasErrors) {
            await dashboard.expectUrlNotMatches(dashboard.dashboardURL);
        } else {
            // Checking if we have been redirected to the next page
            expect.soft(jsErrors).toHaveLength(0);
            expect.soft(failedRequests).toHaveLength(0);
            expect.soft(errors.length, "There where $(errors.length) soft assertion errors").toBe(0);
            await dashboard.expectUrlMatches(dashboard.dashboardURL);
        }
    });
});