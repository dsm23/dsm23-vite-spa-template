import fs from "node:fs";
import path from "node:path";
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

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
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium-dev",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:5173" },
    },

    {
      name: "firefox-dev",
      use: { ...devices["Desktop Firefox"], baseURL: "http://localhost:5173" },
    },

    {
      name: "webkit-dev",
      use: { ...devices["Desktop Safari"], baseURL: "http://localhost:5173" },
    },

    {
      name: "chromium-prod",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:4173" },
    },

    {
      name: "firefox-prod",
      use: { ...devices["Desktop Firefox"], baseURL: "http://localhost:4173" },
    },

    {
      name: "webkit-prod",
      use: { ...devices["Desktop Safari"], baseURL: "http://localhost:4173" },
    },
  ],

  webServer: [
    {
      command: "pnpm run build && pnpm run preview",
      url: `http://localhost:4173`,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "pnpm run dev",
      url: `http://localhost:5173`,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
