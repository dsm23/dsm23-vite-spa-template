import fs from "node:fs";
import path from "node:path";
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

const PORT = process.env.PORT ?? "5173";

const injectFromEnvFile = () => {
  const envDir = ".";
  const envFiles = [
    /** default file */ `.env`,
    /** local file */ `.env.local`,
    /** mode file */ `.env.playwright`,
    /** mode local file */ `.env.playwright.local`,
  ];

  envFiles.forEach((file) => {
    const filePath = path.join(envDir, file);
    if (fs.existsSync(filePath)) {
      dotenv.config({ path: filePath });
    }
  });
};

injectFromEnvFile();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./playwright-tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "pnpm run dev",
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
  },
});
