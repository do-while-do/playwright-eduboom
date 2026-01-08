import { test, expect, Locator } from '@playwright/test';

test.describe('Onboarding process', () => {
    test('Positive scenario - User role selected', async ({ page }) => {
        await page.goto('/onboarding-process');
        //Deny cookies popup to be visible
        const denyCookies = page.locator('[data-title="deny-cookies"]');
        await expect(denyCookies).toBeVisible();
        // Click on cookie div to disappear
        await denyCookies.click();
        // Select next button locator
        const rolePickerContinueButton = page.locator('[data-title="role-picker-continue-btn"]');
        // Assert Next button should be disabled on page load
        await expect(rolePickerContinueButton).toBeDisabled();
        // Pick a role
        const studentElement = page.locator('[data-title="student"]');
        // Assert student role picker button is visible 
        await expect(studentElement).toBeVisible();
        // Pick the student role
        await studentElement.click();
        // Assert Next button is active and visible 
        await expect(rolePickerContinueButton).toBeEnabled();
        await expect(rolePickerContinueButton).toBeVisible();
        // Click on the Role picking button (Next step after role selection)
        await rolePickerContinueButton.click();

        //Selecting a class. Picking lessons for class 4, navigating with left and right navigation buttons 
        async function clickTimes(locator: Locator, times: number) {
            for (let i = 0; i < times; i++) {
                await locator.click();
            }
        }

        await clickTimes(page.locator('.slider-btn-prev'), 3);
        // Selecting locator for class 4 
        const classOption = page.locator('.grade-card:has(.grade-card__number:text("4"))');
        // Asserting class 4 is visible after navigating to it
        await expect(classOption).toBeVisible();
        // Selecting Class 4
        await classOption.click();
        // Navigating to next step after sussesfully picking a class 
        const gradePickerContinueButton = page.locator('[data-title="grade-picker-continue-btn"]');
        await gradePickerContinueButton.click();
        //Checking if we have been redirected to the next page
        await expect(page).toHaveURL(/dashboard/);
        // Checking if only lessons for class 4 are visible
        const ClassSubject = page.locator('div.subject-data', {
            hasText: '4 Szkoła Podstawowa',
            has: page.locator('div.subject-card-title', { hasText: 'Przyroda' })
        });
        await expect(ClassSubject).toBeVisible();
        // Additional check: there are no lessons from other classes
        const Class7Subject = page.locator('div.subject-data', {
            hasText: '7 Szkoła Podstawowa',
            has: page.locator('div.subject-card-title', { hasText: 'Biologia' })
        });
        await expect(Class7Subject).not.toBeVisible();

        const Class8Subject = page.locator('div.subject-data', {
            hasText: '7 Szkoła Podstawowa',
            has: page.locator('div.subject-card-title', { hasText: 'Chemia' })
        });
        await expect(Class8Subject).not.toBeVisible();
    });

    test('Negative scenario - User role selected', async ({ page }) => {
        await page.goto('/onboarding-process');
        //Deny cookies popup to be visible
        const denyCookies = page.locator('[data-title="deny-cookies"]');
        await expect(denyCookies).toBeVisible();
        // Click on cookie div to disappear
        await denyCookies.click();

        // Select next button locator
        const rolePickerContinueButton = page.locator('[data-title="role-picker-continue-btn"]');
        // Assert Next button should be disabled on page load
        await expect(rolePickerContinueButton).toBeDisabled();
        // Pick a role
        const studentElement = page.locator('[data-title="student"]');
        // Assert student role picker button is visible 
        await expect(studentElement).toBeVisible();
        // Pick the student role
        await studentElement.click();
        // Assert Next button is active and visible 
        await expect(rolePickerContinueButton).toBeEnabled();
        await expect(rolePickerContinueButton).toBeVisible();
        // Click on the Role picking button (Next step after role selection)
        await rolePickerContinueButton.click();

        //Selecting a class. Picking lessons for class 4, navigating with left and right navigation buttons 
        async function clickTimes(locator: Locator, times: number) {
            for (let i = 0; i < times; i++) {
                await locator.click();
            }
        }

        await clickTimes(page.locator('.slider-btn-prev'), 3);
        // Selecting locator for class 4 
        const classOption = page.locator('.grade-card:has(.grade-card__number:text("4"))');
        // Asserting class 4 is visible after navigating to it
        await expect(classOption).toBeVisible();
        // Selecting Class 4
        await classOption.click();


        const jsErrors: string[] = [];
        const failedRequests: string[] = [];

        page.on('pageerror', err => jsErrors.push(err.message));
        page.on('requestfailed', req => failedRequests.push(req.url()));

        // Navigating to next step after sussesfully picking a class 
        const gradePickerContinueButton = page.locator('[data-title="grade-picker-continue-btn"]');
        await gradePickerContinueButton.click();

        // Check redirect
        await expect(page).toHaveURL(/dashboard/);

        // Check no JS errors
        expect(jsErrors).toHaveLength(0);

        // Check no failed calls
        expect(failedRequests).toHaveLength(0);

        //Checking if we have not been redirected to the next page
        await expect(page).not.toHaveURL(/dashboard/);


    });

    test('Positive scenario - Teacher role selected', async ({ page }) => {
        await page.goto('/onboarding-process');
        //Deny cookies popup to be visible
        const denyCookies = page.locator('[data-title="deny-cookies"]');
        await expect(denyCookies).toBeVisible();
        // Click on cookie div to disappear
        await denyCookies.click();
        // Select next button locator
        const rolePickerContinueButton = page.locator('[data-title="role-picker-continue-btn"]');
        // Assert Next button should be disabled on page load
        await expect(rolePickerContinueButton).toBeDisabled();
        // Pick a role
        const teacherElement = page.locator('[data-title="teacher"]');
        // Assert teacher role picker button is visible 
        await expect(teacherElement).toBeVisible();
        //Assert there are only two steps in the onboarding process at the top of the page
        const topBarListItems = page.locator('.v-list-item');
        await expect(topBarListItems).toHaveCount(2);
        // Pick the teacher role
        await teacherElement.click();
        // Assert new step is added to the onboarding process at the top of the page
        await expect(topBarListItems).toHaveCount(3);
        // Assert Next button is active and visible 
        await expect(rolePickerContinueButton).toBeEnabled();
        await expect(rolePickerContinueButton).toBeVisible();
        await rolePickerContinueButton.click();
        // Assert heading exists with text 'Wybierz przedmioty'
        const onboardingText = page.locator('.onboarding-text');
        await expect(onboardingText).toHaveText('Wybierz przedmioty');
        // Asserting all subjects are visible to pick from
        const subjects = [
            'Matematyka',
            'Język polski',
            'Chemia',
            'Fizyka',
            'Biologia',
            'Przyroda'
        ];

        for (const subject of subjects) {
            await expect(page.getByText(subject)).toBeVisible();
        }
        // Continue button to be disabled before selecting a subject
        const subjectPickerContinueButton = page.locator('[data-title="subject-picker-continue-btn"]');
        await expect(subjectPickerContinueButton).toBeDisabled();

        //Selecting subject Matematyka 
        const subjectMath = page.locator('.subject-list-item-title', { hasText: 'Matematyka' });
        await subjectMath.click();

        // Assert continue button is enabled after selecting a subject
        await expect(subjectPickerContinueButton).toBeEnabled();
        // Click on continue button to proceed to next step
        await subjectPickerContinueButton.click();
        const gradePickerHeader = page.locator('.grade-picker-text');
        await expect(gradePickerHeader).toHaveText('Wybierz klasy');

        const gradePickerContinueButton = page.locator('[data-title="grade-picker-continue-btn"]');
        await expect(gradePickerContinueButton).toBeDisabled();

        // Asserting all grades are visible to pick from
        const gradeSelect = page.locator('.multy-grade-bubble', { hasText: '7' });
        await expect(gradeSelect).toBeVisible();
        await gradeSelect.click();

        await expect(gradePickerContinueButton).toBeEnabled();
        await gradePickerContinueButton.click();

        //Checking if we have been redirected to the next page
        await expect(page).toHaveURL(/dashboard/);
        // Checking if only lessons for class 7 are visible
        const ClassSubject = page.locator('div.subject-data', {
            hasText: '7 Szkoła Podstawowa',
            has: page.locator('div.subject-card-title', { hasText: 'Matematyka' })
        });
        await expect(ClassSubject).toBeVisible();
    });
});
