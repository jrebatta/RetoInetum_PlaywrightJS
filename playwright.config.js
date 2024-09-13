import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
    features: 'src/features/*.feature',
    steps: 'src/steps/*.js',
});

export default defineConfig({
    use: {
        // Capture screenshot after each test failure.
        screenshot: 'only-on-failure',

        // Record trace only when retrying a test for the first time.
        trace: 'on-first-retry',

        // Record video only when retrying a test for the first time.
        video: 'on'
    },
    outputDir: 'videos/',
    testDir,
    reporter: 'html',
});
