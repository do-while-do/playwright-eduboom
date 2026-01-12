# UChase Playwright Test Suites

![Playwright CI](https://github.com/do-while-do/playwright-eduboom/actions/workflows/playwright.yml/badge.svg?branch=main)

## Notes

- The `page-object-model` branch contains the task from part one with POM that has assertions in the class, `part-two-registration` branch contains POM that has no assertions in the class. I have made two variants because I am not sure what the best practice for this is. There is info about both.
- The `part-two-registration` branch contains the registration flow tests, which I think need priority because it's crucial for the business to have non-anonymous users that can be identified by email and later interact with the platform. This is why this specific flow has been chosen for testing.
- I tried using stealth plugins to avoid fingerprinting but did not succeed
- Some selectors may be dynamic; tests may need updates based on application changes
- Tests are not perfect and can be improved by deeper analysis of the site's selectors and dynamic elements


## Project Structure

```
uchase/
├── package.json                 # Project dependencies and scripts
├── playwright.config.ts         # Playwright configuration
├── README.md                    # This file
├── pages/                       # Page Object Model classes
│   ├── DashboardPageRegistrationFinish.ts
│   ├── DashboardPageStudent.ts
│   ├── DashboardPageTeacher.ts
│   ├── OnboardingProcessPageStudent.ts
│   └── OnboardingProcessPageTeacher.ts
├── tests/                       # Test specifications
│   ├── dashboard-negative-long-phone-number.spec.ts
│   ├── dashboard-negative-wrong-email.spec.ts
│   ├── dashboard-positive-registration-finish.spec.ts
│   ├── onboarding-process-negative-student-role.spec.ts
│   ├── onboarding-process-positive-student-role.spec.ts
│   └── onboarding-process-positive-teacher-role.spec.ts
├── playwright-report/           # Generated test reports
│   └── index.html
└── test-results/                # Test execution results
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

3. **Environment variables:**
   Create a `.env` file in the root directory with:
   ```
   BASE_URL=https://your-app-url.com
   ```

## Running Tests
Since there is some sort of fingerprinting on the website or at CloudFront, the tests cannot be run all at once. That is why I have made them all in separate files that can be run one after another for each scenario, so that the process can be started form the beginning every time.

### Run specific test files
```bash
# Testing onboarding flow for Student - positive scenario first time opening the web site 
npx playwright test onboarding-process-positive-student-role.spec.ts --headed
npx playwright test dashboard-positive-registration-finish.spec.ts --headed

# Testing onboarding flow for Student - negative scenario first time opening the web site 
npx playwright test onboarding-process-negative-student-role.spec.ts --headed
npx playwright test dashboard-positive-registration-finish.spec.ts --headed

# Testing onboarding flow for Teacher - positive scenario first time opening the web site 
npx playwright test onboarding-process-positive-teacher-role.spec.ts --headed
npx playwright test dashboard-positive-registration-finish.spec.ts --headed

# Testing Dashboard registration flow for Student - positive scenario first time opening the web site 
npx playwright test onboarding-process-positive-student-role.spec.ts --headed
npx playwright test dashboard-positive-registration-finish.spec.ts --headed

# Testing Dashboard registration flow for Student - negative, wrong email and/or wrong phone number scenario first time opening the web site 
npx playwright test onboarding-process-positive-student-role.spec.ts --headed
npx playwright test dashboard-negative-wrong-email.spec.ts --headed
npx playwright test dashboard-negative-long-phone-number.spec.ts --headed
```

### View test reports
After running tests, view the HTML report:
```bash
npx playwright show-report
```

## Page Object Model (POM)

The `pages/` directory contains Page Object classes that encapsulate the logic for interacting with different pages of the application:

- `DashboardPage*`: Handle dashboard interactions for different user states
- `OnboardingProcessPage*`: Manage onboarding flows for students and teachers

## Configuration

- **Browser:** All
- **Timeouts:** 20 seconds for actions and expectations
- **Parallel execution:** Enabled for faster test runs
- **Retries:** 2 retries on CI, 0 locally
- **Tracing:** Enabled on first retry for failed tests

