import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://127.0.0.1:3127";

export default defineConfig({
  testDir: "./tests/e2e",
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: "html",
  use: { baseURL, trace: "on-first-retry" },
  webServer: {
    command: "npm run start -- --hostname 127.0.0.1 --port 3127",
    url: baseURL,
    reuseExistingServer: false,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
