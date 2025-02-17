import {
  coverageConfigDefaults,
  defaultExclude,
  defineConfig,
  mergeConfig,
} from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["src/**/?(*.)+(spec|test).[jt]s?(x)"],
      exclude: [...defaultExclude, "**/playwright-tests/**"],
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
    },
  }),
);
