import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
    features: 'src/features/*.feature',
    steps: 'src/steps/*.js',
});

export default defineConfig({
    use: {
        screenshot: 'only-on-failure',

        trace: 'on-first-retry',

        video: 'on'
    },
    outputDir: 'videos/',
    testDir,
    reporter: 'html',
});
