import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    // Scoped default https://vitest.dev/config/include.html#include
    include: ["./app/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    globalSetup: ["./tests/setup/global-setup.ts"],
  },
});
