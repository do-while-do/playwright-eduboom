import { test, expect } from '@playwright/test';
import { OnboardingProcessPageTeacher } from '../pages/OnboardingProcessPageTeacher';
import { DashboardPageTeacher } from '../pages/DashboardPageTeacher';
import { on } from 'node:cluster';

test.describe('Onboarding process', () => {
    test('Positive scenario - Teacher role selected', async ({ page }) => {
        const onboarding = new OnboardingProcessPageTeacher(page);
        const dashboard = new DashboardPageTeacher(page);

        await onboarding.goto();
        // Deny cookies popup amn click on cookie div to disappear
        await onboarding.denyCookiesIfVisible();
        // Assert Next button should be disabled on page load
        await onboarding.expectRoleNextDisabled();
        // Top bar should have 2 items (progress indicators) no role selected yet
        await onboarding.expectTopBarCount(2);
        // Select teacher role
        await onboarding.selectRole('teacher');
        // Top bar should have 3 items (progress indicators) after teacher role selection
        await onboarding.expectTopBarCount(3);
        // Assert Next button is active and visible
        await onboarding.roleButtonToBeVisible();
        // Click continue to proceed
        await onboarding.continueWithSelectedRole();
        // Assert heading exists
        await onboarding.expectOnboardingText(onboarding.onboardingTextStep2, onboarding.onboardingTextLocator);
        // Asserting all subjects are visible to pick from
        for (const s of onboarding.subjectsContainer) {
            await onboarding.expectSubjectVisible(s);
        }
        // Continue button to be disabled before selecting a subject
        await onboarding.expectSubjectContinueDisabled();
        // Selecting subject Matematyka
        await onboarding.selectSubject(onboarding.selectedSubjectToContinueOnboarding);
        // Assert continue button is enabled after selecting a subject
        await onboarding.expectSubjectContinueEnabled();
        // Click on continue button to proceed to next step
        await onboarding.continueWithSelectedSubject();
        // Assert heading exists
        await onboarding.expectOnboardingText(onboarding.onboardingTextStep3, onboarding.gradePickerLocator);
        // Continue button to be disabled before selecting a grade
        await onboarding.expectGradePickerButtonDisabled();
        // Selecting grade 7
        await onboarding.selectMultiGrade(7);
        // Assert continue button is enabled after selecting a grade
        await onboarding.expectGradePickerButtonEnabled();
        // Click on continue button to proceed to dashboard
        await onboarding.continueWithSelectedGrade();
        // Assert we are on dashboard page
        await dashboard.expectUrlMatches(dashboard.dashboardURL);
        // Assert selected subject on step 2is visible
        await dashboard.expectSubjectForGradeVisible(7, 'Matematyka');
    });

});