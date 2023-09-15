import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    dir: "./tests/unit",
    include: ["**/*.{test}.?(c|m)[jt]s?(x)"],
    exclude: [
      ...configDefaults.exclude,
      "./tests/component/**",
      "./tests/e2e/**",
    ],
  },
});
