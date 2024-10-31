import {
  coverageConfigDefaults,
  defaultExclude,
  defineConfig,
  mergeConfig,
} from "vitest/config";
import path from "node:path";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    resolve: {
      alias: {
        "~/test-utils": path.resolve(__dirname, "./test-utils"),
      },
    },
    test: {
      exclude: [...defaultExclude, "**/playwright-tests/**"],
      coverage: {
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
