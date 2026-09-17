import { defineConfig, devices } from "@playwright/test";

const PORT = 5173;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  reporter: "html",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    // Fix the locale so language-dependent assertions (e.g. the default UI language) are
    // deterministic regardless of the host machine's environment.
    locale: "en-US",
  },
  webServer: {
    command: "npm run dev",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Headless Chromium on CI has no GPU, which otherwise breaks WebGL context
        // creation for React Three Fiber. Force software rendering via SwiftShader.
        launchOptions: {
          args: ["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
        },
      },
    },
  ],
});
