import {
  coverageConfigDefaults,
  defaultExclude,
  defineConfig,
  mergeConfig,
} from "vitest/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import storybookTest from "@storybook/addon-vitest/vitest-plugin";
import viteConfig from "./vite.config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        all: true,
        include: ["src/**/*.[jt]s?(x)"],
        exclude: [
          "src/**/*.stories.[jt]s?(x)",
          "src/test-utils/**",
          "src/mocks/**",
          "**/node_modules/**",
          "**/playwright-tests/**",
          ...coverageConfigDefaults.exclude,
        ],
        thresholds: {
          lines: 10,
          functions: 10,
          branches: 10,
          statements: 10,
        },
      },
      environment: "jsdom",
      setupFiles: ["./test-utils/vitest.setup.ts"],
      globals: false,
      logHeapUsage: true,
      watch: false,
      projects: [
        {
          extends: true,
          test: {
            name: "unit",
            include: ["src/**/?(*.)+(spec|test).[jt]s?(x)"],
            exclude: [...defaultExclude, "**/playwright-tests/**"],
          },
        },
        {
          extends: true,
          plugins: [
            // The plugin will run tests for the stories defined in your Storybook config
            // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
            storybookTest({ configDir: path.join(dirname, ".storybook") }),
          ],
          test: {
            name: "storybook",
            browser: {
              enabled: true,
              headless: true,
              provider: "playwright",
              instances: [{ browser: "chromium" }],
            },
            setupFiles: [".storybook/vitest.setup.ts"],
          },
        },
      ],
    },
  }),
);
